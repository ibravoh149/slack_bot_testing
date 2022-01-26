import { getActionInformation } from "../utils/getResponseValues";
import {
  ISlackCommandBodyObject,
  ISlackCommandResponse,
  ISlackMessageObject,
  ISlackResponse,
  ACTION_TYPES,
  IHistoryObject,
  INTERACTIVE_TYPE,
} from "./interfaces";
import axios from "axios";
import shortid from "shortid";
import { BotMessages } from "../Model/model";
import { IBotMessagesDocument, IMsg } from "../Model/types";
// import * as cryptoRandomString from "crypto-random-string";
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);

class Services {
  private async createHistory(data: IHistoryObject) {
    return await new BotMessages(data).save();
  }

  private async updateHistory(
    newEntry: Record<string, any>,
    userResponse: Record<string, any>,
    history: IBotMessagesDocument
  ) {
    history.conversation.push({
      action_id: newEntry.action_id,
      bot: { message: newEntry.message },
    });
    if (userResponse.responses) {
      let conversations = history.conversation;
      const conversation_index = conversations.findIndex(
        (con) => con.action_id === userResponse.action_id
      );
      if (conversation_index >= 0) {
        conversations[conversation_index].user = {
          message: Array.isArray(userResponse.responses)
            ? userResponse.responses.join(",")
            : userResponse.responses,
          time: new Date(),
        };
        history.conversation = conversations;
      }
    }

    await history.save();
    return await Promise.resolve();
  }

  private async getHistory(block_id: string) {
    return await BotMessages.findOne({ block_id });
  }

  private async getUserResponse(
    selected_option: Record<string, any> | Record<string, any>[]
  ) {
    let response: string | string[] = [];
    if (!Array.isArray(selected_option)) {
      response = selected_option.value;
    } else {
      response = selected_option.map((option) => {
        return option.value;
      });
    }
    return response;
  }

  async command(data: ISlackCommandBodyObject) {
    const action = "action_1";
    const action_info = getActionInformation(action);
    // const block_id = cryptoRandomString({ type: "alphanumeric", length: 10 });
    const block_id = shortid.generate();
    const resObject: ISlackCommandResponse = {
      channel: data.channel_id,
      text: action_info?.message + " :slightly_smiling_face:",
      attachments: [
        {
          color: "#2c963f",
          blocks: [
            {
              type: "section",
              block_id,
              text: {
                type: "mrkdwn",
                text: "Please Select",
              },
              accessory: {
                action_id: action,
                type: "static_select",
                placeholder: {
                  type: "plain_text",
                  text: "Select an item",
                },
                options: action_info?.dropDownValues,
              },
            },
          ],
        },
      ],
    };

    await this.createHistory({
      user: { id: data.user_id, name: data.user_name },
      block_id,
      command: data.command as string,
      conversation: [
        { bot: { message: action_info?.message }, action_id: action },
      ],
      channel_id: data.channel_id,
      channel_name: data.channel_name,
    });
    return resObject;
  }

  async message(data: ISlackMessageObject) {
    const action = data.actions && data.actions[0];
    const action_id = action?.action_id;
    const current_action_info = getActionInformation(action_id as string);
    const next_action_info = getActionInformation(
      current_action_info?.next as string
    );
    const responseUrl = data.response_url;

    let blocks: ISlackResponse[] = [
      {
        block_id: action?.block_id,
        type: "section",
        text: { type: "mrkdwn", text: "Thank you" },
      },
    ];

    if (action_id !== ACTION_TYPES.action_end) {
      let current_block: ISlackResponse = {
        ...blocks[0],
      };
      if (next_action_info?.key !== ACTION_TYPES.action_end) {
        current_block = {
          ...current_block,
          text: { type: "mrkdwn", text: "Please Select" },
          accessory: {
            type: next_action_info?.interactive_type,
            action_id: next_action_info?.key,
            placeholder: {
              type: "plain_text",
              text: "Select item(s) from the list",
            },
            options: next_action_info?.dropDownValues,
          },
        };
      }

      blocks[0] = current_block;
    }

    const history = await this.getHistory(action?.block_id as string);

    if (history) {
      let userResponse: Record<string, any> = {
        action_id,
        responses: null,
      };

      if (data.type === "block_actions") {
        userResponse.responses = await this.getUserResponse(
          action?.type === INTERACTIVE_TYPE.multi_static_select
            ? (action.selected_options as Record<string, any>[])
            : (action?.selected_option as Record<string, any>)
        );
      }

      const newEntry: Record<string, any> = {
        message: next_action_info?.message,
        action_id: next_action_info?.key as string,
      };

      await this.updateHistory(newEntry, userResponse, history);
    }

    const resObject: ISlackCommandResponse = {
      channel: data.channel.id,
      text: next_action_info?.message,
      attachments: [
        {
          color: "#2c963f",
          blocks,
        },
      ],
    };

    return await this.postMessage(resObject, responseUrl as string);
  }

  async postMessage(data: ISlackCommandResponse, url: string) {
    try {
      await axios({
        method: "POST",
        url,
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getHistories() {
    return await BotMessages.find({}).lean().exec();
  }
}

export default new Services();

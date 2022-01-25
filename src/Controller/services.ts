import { getActionInformation } from "../utils/getResponseDown";
import {
  ISlackCommandBodyObject,
  ISlackCommandResponse,
  ISlackMessageObject,
  ISlackResponse,
  ACTION_TYPES,
  IHistoryObject,
} from "./interfaces";
import axios from "axios";
import shortid from "shortid";
import { BotMessages } from "../Model/model";

class Services {
  // private async createHistory(data: IHistoryObject) {
  //   return await new BotMessages(data).save();
  // }

  // private async updateHistory() {}

  // private async getHistory(block_id: string) {
  //   return await BotMessages.findOne({ block_id });
  // }

  async command(data: ISlackCommandBodyObject) {
    const action = "action_1";
    const action_info = getActionInformation(action);
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

    // await this.createHistory({
    //   user: { id: data.user_id, name: data.user_name },
    //   block_id,
    //   command: data.command as string,
    //   conversation: [
    //     { bot: { message: action_info?.message }, action_id: action },
    //   ],
    //   channel_id: data.channel_id,
    //   channel_name: data.channel_name,
    // });
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
        text:
          action_id === ACTION_TYPES.action_end
            ? { type: "mrkdwn", text: "Thank you" }
            : { type: "mrkdwn", text: "Please Select" },
      },
    ];

    if (action_id !== ACTION_TYPES.action_end) {
      let current_block: ISlackResponse = {
        ...blocks[0],
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

      blocks[0] = current_block;
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
}

export default new Services();

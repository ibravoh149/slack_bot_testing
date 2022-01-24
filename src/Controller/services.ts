import { getActionInformation } from "../utils/getResponseDown";
import {
  ISlackCommandBodyObject,
  ISlackCommandResponse,
  ISlackMessageObject,
  ISlackResponse,
  ACTION_TYPES,
} from "./interfaces";

class Services {
  async command(data: ISlackCommandBodyObject) {
    const action = "action_1";
    const action_info = getActionInformation(action);
    const resObject: ISlackCommandResponse = {
      // response_type: "in_channel",
      channel: data.channel_id,
      text: "Hello :slightly_smiling_face:",
      attachments: [
        {
          text: action_info?.message,
          fallback: action_info?.message,
          color: "#2c963f",
          // attachment_type: "default",
          // callback_id: action_info?.next,

          blocks: [
            {
              type: "section",
              block_id: action,
              text: {
                type: "mrkdwn",
                text: "Please Select",
              },
              accessory: {
                action_id: action_info?.next,
                type: "static_select",
                placeholder: {
                  type: "plain_text",
                  text: "Select an item",
                },
                options: action_info?.dropDownValues,
                // options: [
                //   {
                //     text: {
                //       type: "mrkdwn",
                //       text: "this is plain_text text",
                //     },
                //     value: "value-0",
                //   },
                //   {
                //     text: {
                //       type: "plain_text",
                //       text: "this is plain_text text",
                //     },
                //     value: "value-1",
                //   },
                //   {
                //     text: {
                //       type: "plain_text",
                //       text: "this is plain_text text",
                //     },
                //     value: "value-2",
                //   },
                // ],
              },
            },
          ],
        },
      ],
    };

    return resObject;
  }

  async message(data: ISlackMessageObject) {
    // const { actions, user, channel } = data;

    const action = data.actions && data.actions[0];
    const action_id = action?.action_id;
    const action_info = getActionInformation(action_id as string);

    let blocks: ISlackResponse[] = [
      {
        block_id: action_id,
        type: "section",
        text:
          action_id === ACTION_TYPES.action_end
            ? { type: "mrkdwn", text: action_info?.message }
            : { type: "mrkdwn", text: "Please Select" },
      },
    ];

    if (action_id !== ACTION_TYPES.action_end) {
      let current_block: ISlackResponse = {
        ...blocks[0],
        accessory: {
          type: action_info?.interactive_type,
          action_id: action_info?.next,
          placeholder: {
            type: "plain_text",
            text: "Select item(s) from the list",
          },
          options: action_info?.dropDownValues,
        },
      };

      blocks[0] = current_block;
    }

    const resObject: ISlackCommandResponse = {
      response_type: "in_channel",
      channel: data.channel.id,
      text: action_info?.message,
      attachments: [
        {
          text: action_info?.message,
          color: "#2c963f",
          fallback: action_info?.message,
          attachment_type: "default",
          blocks,
        },
      ],
    };

    return resObject;
  }
}

export default new Services();

import { getLevelInformation } from "../utils/getResponseDown";
import {
  ISlackCommandBodyObject,
  ISlackCommandResponse,
  ISlackMessageObject,
  ISlackMessageReponse,
} from "./interfaces";

class Services {
  async command(data: ISlackCommandBodyObject) {
    const level_info = getLevelInformation("level_1");
    // const resObject: ISlackCommandResponse = {
    //   response_type: "in_channel",
    //   channel: data.channel_id,
    //   text: "Hello :slightly_smiling_face:",
    //   attachments: [
    //     {
    //       text: level_info?.message,
    //       fallback: level_info?.message,
    //       color: "#2c963f",
    //       attachment_type: "default",
    //       callback_id: level_info?.next,
    //       actions: [
    //         {
    //           name: "response_selection",
    //           text: "Select a response",
    //           type: "select",
    //           options: level_info?.dropDownValues,
    //         },
    //       ],
    //     },
    //   ],
    // };
    const resObject = {
      blocks: [
        {
          type: "section",
          block_id: "section678",
          text: {
            type: "mrkdwn",
            text: "Pick an item from the dropdown list",
          },
          accessory: {
            action_id: "text1234",
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Select an item",
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "*this is plain_text text*",
                },
                value: "value-0",
              },
              {
                text: {
                  type: "plain_text",
                  text: "*this is plain_text text*",
                },
                value: "value-1",
              },
              {
                text: {
                  type: "plain_text",
                  text: "*this is plain_text text*",
                },
                value: "value-2",
              },
            ],
          },
        },
      ],
    };

    return resObject;
  }

  async message(data: ISlackMessageObject) {
    const { callback_id } = data;
    const level_info = getLevelInformation(callback_id);

    let response: ISlackMessageReponse = {
      response_type: "in_channel",
      channel: data.channel.id,
      text: level_info?.message + ":slightly_smiling_face:",
      response_url: data.response_url,
    };

    if (level_info?.dropDownValues && level_info.dropDownValues.length > 0) {
      response.blocks = [
        {
          type: "section",
          block_id: "section",
        },
      ];
    }
  }
}

export default new Services();

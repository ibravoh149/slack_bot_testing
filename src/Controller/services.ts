import { getLevelInformation } from "../utils/getResponseDown";
import { ISlackCommandBodyObject, ISlackCommandResponse } from "./interfaces";

class Services {
  async command(data: ISlackCommandBodyObject) {
    const level_info = getLevelInformation("level_1");
    const resObject: ISlackCommandResponse = {
      response_type: "in_channel",
      channel: data.channel_id,
      text: "Hello :slightly_smiling_face:",
      attachments: [
        {
          text: level_info?.message,
          fallback: level_info?.message,
          color: "#2c963f",
          attachment_type: "default",
          callback_id: level_info?.next,
          actions: [
            {
              name: "response_selection_name",
              text: "Select a response",
              type: "multi_static_select",
              options: level_info?.dropDownValues,
            },
          ],
        },
      ],
    };
    return resObject;
  }
}

export default new Services();

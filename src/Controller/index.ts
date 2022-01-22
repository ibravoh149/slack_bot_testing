import { Request, Response } from "express";
import { ISlackCommandBodyObject } from "./interfaces";
import services from "./services";

class AppController {
  async command(req: Request, res: Response) {
    const data: ISlackCommandBodyObject = req.body;
    if (!data.command || data.command !== "/bot") {
      return res.status(400).json({ message: "Invalid command" });
    }
    const response = await services.command(data);
    return res.status(200).json(response);
  }

  async interact(req: Request, res: Response) {
    const dt =
      '{"type":"interactive_message","actions":[{"name":"response_selection_name","type":"select","selected_options":[{"value":"Feeling Lucky"}]}],"callback_id":"level_2","team":{"id":"T02U701BZFU","domain":"serenbotworkspace"},"channel":{"id":"C02U98XSA20","name":"bot"},"user":{"id":"U02UKJWBM25","name":"ibravoh149"},"action_ts":"1642540128.192441","message_ts":"1642540124.000200","attachment_id":"1","token":"3LGdy7ySBfTDOOM6qCpjSnxa","is_app_unfurl":false,"enterprise":null,"is_enterprise_install":false,"original_message":{"type":"message","subtype":"bot_message","text":"Hello :slightly_smiling_face:","ts":"1642540124.000200","bot_id":"B02U9AW3DMJ","attachments":[{"id":1,"color":"2c963f","fallback":"Welcome. How are you doing?","text":"Welcome. How are you doing?","callback_id":"level_2","actions":[{"id":"1","name":"response_selection_name","text":"Select a response","type":"select","data_source":"static","options":[{"text":"Doing Well","value":"Doing Well"},{"text":"Neutral","value":"Neutral"},{"text":"Feeling Lucky","value":"Feeling Lucky"}]}]}]},"response_url":"https:\\/\\/hooks.slack.com\\/actions\\/T02U701BZFU\\/2994765902304\\/LeKpPTaUr4EYRJ1jF8sbEH4i","trigger_id":"2956406889159.2959001407538.dd6034d3b3364c93c694cc2af3586afd"}';

    const data = req.body;

    console.log(JSON.parse(data.payload));
    console.log(data.payload);

    return res.status(200);
  }
}

export default new AppController();

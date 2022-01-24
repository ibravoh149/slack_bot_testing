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
      // '{"type":"block_actions","user":{"id":"U02UKJWBM25","username":"ibravoh149","name":"ibravoh149","team_id":"T02U701BZFU"},"api_app_id":"A02U99U7BPE","token":"3LGdy7ySBfTDOOM6qCpjSnxa","container":{"type":"message_attachment","message_ts":"1642891375.000400","attachment_id":1,"channel_id":"C02U98XSA20","is_ephemeral":true,"is_app_unfurl":false},"trigger_id":"2989694189157.2959001407538.1e1e2c0074f22a0a6314abf2f84509b9","team":{"id":"T02U701BZFU","domain":"serenbotworkspace"},"enterprise":null,"is_enterprise_install":false,"channel":{"id":"C02U98XSA20","name":"bot"},"state":{"values":{"section678":{"text1234":{"type":"multi_static_select","selected_options":[{"text":{"type":"plain_text","text":"*this is plain_text text*","emoji":true},"value":"value-1"},{"text":{"type":"plain_text","text":"*this is plain_text text*","emoji":true},"value":"value-0"}]}}}},"response_url":"https://hooks.slack.com/actions/T02U701BZFU/2992640016195/YpcOhCHjJpZH3RgbXvNsMmZ5","actions":[{"type":"multi_static_select","action_id":"text1234","block_id":"section678","selected_options":[{"text":{"type":"plain_text","text":"*this is plain_text text*","emoji":true},"value":"value-1"},{"text":{"type":"plain_text","text":"*this is plain_text text*","emoji":true},"value":"value-0"}],"placeholder":{"type":"plain_text","text":"Select items","emoji":true},"action_ts":"1642892553.623597"}]}';

      '{"type":"block_actions","user":{"id":"U02UKJWBM25","username":"ibravoh149","name":"ibravoh149","team_id":"T02U701BZFU"},"api_app_id":"A02U99U7BPE","token":"3LGdy7ySBfTDOOM6qCpjSnxa","container":{"type":"message","message_ts":"1642890521.000300","channel_id":"C02U98XSA20","is_ephemeral":true},"trigger_id":"2977959283607.2959001407538.0fcb3841d3efc42e88ab92737658cff7","team":{"id":"T02U701BZFU","domain":"serenbotworkspace"},"enterprise":null,"is_enterprise_install":false,"channel":{"id":"C02U98XSA20","name":"bot"},"state":{"values":{"section678":{"text1234":{"type":"static_select","selected_option":{"text":{"type":"plain_text","text":"*this is plain_text text*","emoji":true},"value":"value-2"}}}}},"response_url":"https:\\/\\/hooks.slack.com\\/actions\\/T02U701BZFU\\/3005221437889\\/LlVYLY2qgvWBA0C6aTvRjNhG","actions":[{"type":"static_select","action_id":"text1234","block_id":"section678","selected_option":{"text":{"type":"plain_text","text":"*this is plain_text text*","emoji":true},"value":"value-2"},"placeholder":{"type":"plain_text","text":"Select an item","emoji":true},"action_ts":"1642890611.532852"}]}';

    // '{"type":"block_actions","user":{"id":"U02UKJWBM25","username":"ibravoh149","name":"ibravoh149","team_id":"T02U701BZFU"},"api_app_id":"A02U99U7BPE","token":"3LGdy7ySBfTDOOM6qCpjSnxa","container":{"type":"message_attachment","message_ts":"1642891375.000400","attachment_id":1,"channel_id":"C02U98XSA20","is_ephemeral":true,"is_app_unfurl":false},"trigger_id":"2992598541410.2959001407538.8ac0781bf8085dbeca4625de11a903bd","team":{"id":"T02U701BZFU","domain":"serenbotworkspace"},"enterprise":null,"is_enterprise_install":false,"channel":{"id":"C02U98XSA20","name":"bot"},"state":{"values":{"section678":{"text1234":{"type":"multi_static_select","selected_options":[]}}}},"response_url":"https://hooks.slack.com/actions/T02U701BZFU/2992631487427/b9ST5eGo5zEbWXdbBTPHEd2e","actions":[{"type":"multi_static_select","action_id":"text1234","block_id":"section678","selected_options":[],"placeholder":{"type":"plain_text","text":"Select items","emoji":true},"action_ts":"1642892001.941494"}]}';

    // '{"type":"interactive_message","actions":[{"name":"response_selection_name","type":"select","selected_options":[{"value":"Feeling Lucky"}]}],"callback_id":"level_2","team":{"id":"T02U701BZFU","domain":"serenbotworkspace"},"channel":{"id":"C02U98XSA20","name":"bot"},"user":{"id":"U02UKJWBM25","name":"ibravoh149"},"action_ts":"1642540128.192441","message_ts":"1642540124.000200","attachment_id":"1","token":"3LGdy7ySBfTDOOM6qCpjSnxa","is_app_unfurl":false,"enterprise":null,"is_enterprise_install":false,"original_message":{"type":"message","subtype":"bot_message","text":"Hello :slightly_smiling_face:","ts":"1642540124.000200","bot_id":"B02U9AW3DMJ","attachments":[{"id":1,"color":"2c963f","fallback":"Welcome. How are you doing?","text":"Welcome. How are you doing?","callback_id":"level_2","actions":[{"id":"1","name":"response_selection_name","text":"Select a response","type":"select","data_source":"static","options":[{"text":"Doing Well","value":"Doing Well"},{"text":"Neutral","value":"Neutral"},{"text":"Feeling Lucky","value":"Feeling Lucky"}]}]}]},"response_url":"https:\\/\\/hooks.slack.com\\/actions\\/T02U701BZFU\\/2994765902304\\/LeKpPTaUr4EYRJ1jF8sbEH4i","trigger_id":"2956406889159.2959001407538.dd6034d3b3364c93c694cc2af3586afd"}';

    const data = req.body;

    // console.log(JSON.parse(data.payload));
    // console.log(data.payload);

    // return res.status(200).json(JSON.parse(dt));
    const response = await services.message(JSON.parse(data.payload));
    return res.json(response);
  }
}

export default new AppController();

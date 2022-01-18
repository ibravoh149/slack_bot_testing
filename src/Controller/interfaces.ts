export interface ISlackCommandBodyObject {
  token?: string;
  team_id?: string;
  team_domain?: string;
  enterprise_id?: string;
  enterprise_name?: string;
  channel_id?: string;
  channel_name?: string;
  user_id?: string;
  user_name?: string;
  command?: string;
  text?: string;
  response_url?: string;
  trigger_id?: string;
  api_app_id?: string;
}

export interface ISlackCommandResponse {
  response_type?: string;
  channel?: string;
  text?: string;
  attachments?: [
    {
      text?: string;
      fallback?: string;
      color: string;
      attachment_type?: string;
      callback_id?: string;
      actions: {
        name?: string;
        text?: string;
        type?: string;
        options?: { text: string; value: string }[];
      }[];
    }
  ];
}

export interface IUserResponses {
  key: string;
  dropDownValues?: { text: string; value: string }[];
  message: string;
  next?: string;
}

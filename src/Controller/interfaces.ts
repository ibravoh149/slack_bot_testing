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

export interface ISlackMessageObject {
  type: string;
  actions: {
    name: string;
    type: string;
    selected_options: {
      value: string;
    }[];
  }[];
  callback_id: string;
  team: {
    id: string;
    domain: string;
  };
  channel: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
  };
  action_ts: string;
  message_ts: string;
  attachment_id: string;
  token: string;
  is_app_unfurl: boolean;
  enterprise?: null | string;
  is_enterprise_install: boolean;
  original_message: {
    type: string;
    subtype: string;
    text: string;
    ts: string;
    bot_id: string;
    attachments: {
      id: number;
      color: string;
      fallback: string;
      text: string;
      callback_id: string;
      actions: {
        id: string;
        name: string;
        text: string;
        type: string;
        data_source: string;
        options: {
          text: string;
          value: string;
        }[];
      }[];
    }[];
  };
  response_url: string;
  trigger_id: string;
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
export interface ISlackMessageReponse {
  response_type?: string;
  channel?: string;
  text?: string;
  response_url?: string;
  blocks?: {
    type?: string;
    block_id?: string;
    text?: {
      type?: string;
      text?: string;
    };
    accessory?: {
      action_id?: string;
      type?: string;
      placeholder?: {
        type?: string;
        text?: string;
      };
      options?: {
        text?: {
          type?: string;
          text?: string;
        };
        value?: string;
      }[];
    };
  }[];
}
export interface IUserResponses {
  key: string;
  dropDownValues?: { text: string; value: string }[];
  message: string;
  next?: string;
}

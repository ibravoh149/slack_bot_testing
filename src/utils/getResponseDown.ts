import { ACTION_TYPES, IUserResponses } from "../Controller/interfaces";

const responseInformation: IUserResponses[] = [
  {
    key: ACTION_TYPES.action_1,
    dropDownValues: [
      { text: { text: "Doing Well", type: "plain_text" }, value: "Doing Well" },
      { text: { text: "Neutral", type: "plain_text" }, value: "Neutral" },
      {
        text: { text: "Feeling Lucky", type: "plain_text" },
        value: "Feeling Lucky",
      },
    ],
    message: "Welcome. How are you doing?",
    next: ACTION_TYPES.action_2,
    interactive_type: "static_select",
  },
  {
    key: ACTION_TYPES.action_2,
    dropDownValues: [
      { text: { text: "Football", type: "plain_text" }, value: "Football" },
      { text: { text: "Music", type: "plain_text" }, value: "Music" },
      { text: { text: "Sleep", type: "plain_text" }, value: "Sleep" },
      { text: { text: "Movies", type: "plain_text" }, value: "Movies" },
      { text: { text: "Basketball", type: "plain_text" }, value: "Basketball" },
    ],
    message: "What are your favorite hobbies",
    next: ACTION_TYPES.action_end,
    interactive_type: "multi_static_select",
  },
  {
    key: ACTION_TYPES.action_end,
    dropDownValues: [],
    message: "thank you",
  },
];

export const getActionInformation = (
  key: string
): IUserResponses | undefined => {
  if (!key) {
    return undefined;
  }
  return responseInformation.find((response) => {
    return response.key.toLowerCase() === key.toLowerCase();
  });
};

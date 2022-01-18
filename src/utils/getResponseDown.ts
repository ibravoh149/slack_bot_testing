import { IUserResponses } from "../Controller/interfaces";

const responseInformation: IUserResponses[] = [
  {
    key: "level_1",
    dropDownValues: [
      { text: "Doing Well", value: "Doing Well" },
      { text: "Neutral", value: "Neutral" },
      { text: "Feeling Lucky", value: "Feeling Lucky" },
    ],
    message: "Welcome. How are you doing?",
    next: "level_2",
  },
  {
    key: "level_2",
    dropDownValues: [
      { text: "Football", value: "Football" },
      { text: "Music", value: "Music" },
      { text: "Sleep", value: "Sleep" },
      { text: "Movies", value: "Movies" },
      { text: "Basketball", value: "Basketball" },
    ],
    message: "What are your favorite hobbies",
    next: "level_3",
  },
  {
    key: "level_3",
    dropDownValues: [],
    message: "thank you",
  },
];

export const getLevelInformation = (
  key: string
): IUserResponses | undefined => {
  if (!key) {
    return undefined;
  }
  return responseInformation.find((response) => {
    return response.key.toLowerCase() === key.toLowerCase();
  });
};

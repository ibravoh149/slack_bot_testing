import { expect } from "chai";
import {
  ACTION_TYPES,
  INTERACTIVE_TYPE,
  // ISlackCommandBodyObject,
} from "../../src/Controller/interfaces";
import { getActionInformation } from "../../src/utils/getResponseValues";
// import Services from "../../src/Controller/services";
import { connect } from "../../src/connection";

describe("Components", () => {
  before(async () => {
    connect();
  });
  describe("util", () => {
    it("should return action_1 as key when action_1 is passed in", () => {
      expect(getActionInformation("action_1")?.key).to.equal("action_1");
    });

    it("should return 'Welcome. How are you doing?' as a message when action_1 is passed in as key", () => {
      expect(getActionInformation("action_1")?.message).to.equal(
        "Welcome. How are you doing?"
      );
    });

    it("should expect a dropdown select type when action_1 is passed in as key", () => {
      expect(getActionInformation("action_1")?.interactive_type).to.equal(
        INTERACTIVE_TYPE.static_select
      );
    });

    it("should expect dropdown options not to be empty when action_1 is passed in as key", () => {
      expect(
        getActionInformation("action_1")?.dropDownValues
      ).length.greaterThan(0);
    });

    it("should return action_2 as key when action_2 is passed in", () => {
      expect(getActionInformation("action_2")?.key).to.equal(
        ACTION_TYPES.action_2
      );
    });

    it("should return 'What are your favorite hobbies' as a message when action_2 is passed in as key", () => {
      expect(getActionInformation("action_2")?.message).to.equal(
        "What are your favorite hobbies"
      );
    });

    it("should expect a multiple dropdown select type when action_2 is passed in as key", () => {
      expect(getActionInformation("action_2")?.interactive_type).to.equal(
        INTERACTIVE_TYPE.multi_static_select
      );
    });

    it("should expect dropdown options not to be empty when action_2 is passed in as key", () => {
      expect(
        getActionInformation("action_2")?.dropDownValues
      ).length.greaterThan(0);
    });

    it("should return action_end as key when action_end is passed in", () => {
      expect(getActionInformation("action_end")?.key).to.equal(
        ACTION_TYPES.action_end
      );
    });

    it("should return 'thank you' as a message when action_end is passed in as key", () => {
      expect(getActionInformation("action_end")?.message).to.equal("thank you");
    });

    it("should not expect a dropdown select when action_end is passed in as key", () => {
      expect(getActionInformation("action_end")?.interactive_type).to.equal(
        undefined
      );
    });

    it("should expect dropdown options to be empty when action_end is passed in as key", () => {
      expect(
        getActionInformation("action_end")?.dropDownValues
      ).length.lessThanOrEqual(0);
    });
  });
});

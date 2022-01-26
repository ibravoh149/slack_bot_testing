import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import supertest from "supertest";
import { BotMessages } from "../../src/Model/model";
import * as dotenv from "dotenv";
import axios from "axios";
import { ISlackCommandBodyObject } from "../../src/Controller/interfaces";
import {
  fakeSlackSignature,
  command_payload,
  wrong_command_payload,
} from "../mockData";
// const assert = require("assert");

const app = require("../../index");

dotenv.config();
process.env.SLACK_TOKEN = process.env.SLACK_BOT_TOKEN;
process.env.SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;
process.env.SLACK_VERIFICATION_TOKEN = process.env.SLACK_VERIFICATION_TOKEN;

const fakeSig = fakeSlackSignature(command_payload);
const headers = {
  "x-slack-request-timestamp": fakeSig.timeStamp,
  "x-slack-signature": fakeSig.sig,
};

const bad_header = {
  "x-slack-request-timestamp": fakeSig.timeStamp + 8743,
  "x-slack-signature": fakeSig.sig,
};

// "test:integration": "concurrently --kill-others --names steno,mocha --success first \"node test/launch-steno.ts\" \"mocha test/integration/*.ts\"",
// script for integration test

const request = supertest(app);
chai.use(chaiHttp);

describe("App", () => {
  before(async () => {
    await BotMessages.deleteMany({});
  });

  describe("command: /command", () => {
    describe("command: /command", () => {
      it("should successfully wake up the bot", (done) => {
        request
          .post("/command/bot")
          .set(headers)
          .send(command_payload)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body.text).to.include("Welcome. How are you doing?");
            done();
          });
      });

      it("should return 400 if the wrong slash command is sent", (done) => {
        const sig = fakeSlackSignature(wrong_command_payload);
        request
          .post("/command/bot")
          .set({
            "x-slack-request-timestamp": sig.timeStamp,
            "x-slack-signature": sig.sig,
          })
          .send(wrong_command_payload)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(400);
            done();
          });
      });

      it("should fail with 401 if the slack secret is wrong", (done) => {
        request
          .post("/command/bot")
          .set(bad_header)
          .send(command_payload)
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(401);
            done();
          });
      });

      it("should return history of conversations with bot", (done) => {
        request
          .get("/messages/history")
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body).instanceOf(Array);
            expect(res.body).length.greaterThan(0);
            done();
          });
      });
    });
  });
});

const stenoControlPort = 4000;

function startReplayForScenario(scenario: string) {
  return axios.post(`http://localhost:${stenoControlPort}/start`, {
    name: scenario,
  });
}

function stopReplay() {
  return axios
    .post(`http://localhost:${stenoControlPort}/stop`)
    .then((response) => response.data);
}

function waitOneSecond() {
  return new Promise((r) => setTimeout(r, 1000));
}

/*
 * App helpers
 */
const appPort = process.env.PORT || 8080;

function sendCommand(payload: ISlackCommandBodyObject) {
  return axios.post(`http://localhost:${appPort}/command/bot`, payload);
}

// const testTicketStoreLocation = "./test/integration/data/tickets";

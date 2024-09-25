"use server";

import { getClient } from "@/apollo";
import { gql } from "@apollo/client";
import { checkField } from "@/utils/contact";
import mailchimp from "@mailchimp/mailchimp_marketing";
import IContact from "@/types/contact";
import { Resend } from "resend";
import Email from "@/components/contact/notification";
const md5 = require("md5");

export const subscribe = async (formData: FormData) => {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER,
  });

  const listId = checkField(process.env.MAILCHIMP_LIST_ID);
  const subscribingUser = {
    firstName: checkField(formData.get("name")),
    lastName: checkField(formData.get("surname")),
    email: checkField(formData.get("email")),
  };

  const addListMember = async () => {
    await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });
  };

  try {
    const res = await mailchimp.lists.getListMember(
      listId,
      md5(subscribingUser.email),
    );

    if (res.status !== "subscribed" && res.status !== "pending") {
      await addListMember();
    }
  } catch (e: any) {
    if (e.status === 404) {
      await addListMember();
    } else {
      console.error(e);
      throw e;
    }
  }
};

export const contact = async ({
  formData,
  params,
}: {
  formData: FormData;
  params: { locale: string; page: string; prefix?: string };
}) => {
  const client = getClient(),
    mutation = gql`
      mutation CreateMessage($data: mutationMessageInput!) {
        createMessage(data: $data) {
          id
          name
          email
          tel
          message
          page
          newsletter
          status
        }
      }
    `,
    resend = new Resend(process.env.RESEND_API_KEY);

  const variables: IContact = {
    data: {
      name: checkField(formData.get("name")),
      email: checkField(formData.get("email")),
      message: checkField(formData.get("message")),
      page: params.page,
      status: "pending",
      newsletter: formData.get("newsletter") === "on",
    },
    received: new Date(),
  };

  if (formData.get("tel") && params.prefix) {
    variables.data.tel = `${params.prefix} ${formData.get("tel")}`;
  }

  const { data } = await client.mutate({
    mutation,
    variables,
  });

  if (formData.get("newsletter") === "on") {
    const splitName = (
      name: string,
    ): { firstName: string; lastName: string } => {
      const [firstName, ...lastNameParts] = name.split(" ");
      const lastName = lastNameParts.join(" ");
      return { firstName, lastName };
    };
    const { firstName, lastName } = splitName(checkField(formData.get("name")));
    formData.set("name", firstName);
    formData.set("surname", lastName || "");
    await subscribe(formData);
  }

  await resend.emails.send({
    from: `Notification <notification@g-yachts.com>`,
    to: ["info@g-yachts.com", "alban@g-yachts.com"],
    reply_to: variables.data.email,
    subject: "New Message received",
    react: Email(variables),
  });

  return data.createMessage;
};

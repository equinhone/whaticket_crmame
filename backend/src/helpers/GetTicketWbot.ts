import { WASocket } from "@whiskeysockets/baileys";
import { getWbot } from "../libs/wbot";
import GetDefaultWhatsApp from "./GetDefaultWhatsApp";
import Ticket from "../models/Ticket";
import { Store } from "../libs/store";

type Session = WASocket & {
  id?: number;
  store?: Store;
};

export const GetTicketWbot = async (ticket: Ticket): Promise<Session> => {
  if (!ticket.whatsappId) {
    const defaultWhatsapp = await GetDefaultWhatsApp(ticket.user.id);

    await ticket.$set("whatsapp", defaultWhatsapp);
  }

  const wbot = getWbot(ticket.whatsappId);
  return wbot;
};

export const GetWbotAPI = async (aNumber:string): Promise<Session> => {
  /*if (!ticket.whatsappId) {
    const defaultWhatsapp = await GetDefaultWhatsApp(ticket.user.id);

    await ticket.$set("whatsapp", defaultWhatsapp);
  }*/  

  const wbot = getWbot(1);
  return wbot;
};


export default {
  GetTicketWbot,GetWbotAPI
}


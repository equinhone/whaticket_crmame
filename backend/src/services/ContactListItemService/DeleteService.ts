import ContactListItem from "../../models/ContactListItem";
import AppError from "../../errors/AppError";

export async function DeleteService(id: string): Promise<void> {
  const record = await ContactListItem.findOne({
    where: { id }
  });

  if (!record) {
    throw new AppError("ERR_NO_CONTACTLISTITEM_FOUND", 404);
  }

  await record.destroy();
};

export async function DeleteServiceAllContactList(id: string): Promise<void> {
  const record = await ContactListItem.findOne({
    //where: { id }
    where: { contactListId: id } 
  });

  if (!record) {
    throw new AppError("ERR_NO_CONTACTLISTITEM_FOUND", 404);
  }

  await ContactListItem.destroy({ where: { contactListId: id } });  
  
}

export default {DeleteService,DeleteServiceAllContactList};

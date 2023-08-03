import supabase from "../../supabase";

export async function getCards() {
   const { data, error } = await supabase.from("cards").select("*");
   if (error) {
      console.error("Error getting cards:", error);
      return null;
   }
   console.log("getCards data:", data);
   return data;
}

export async function createCard(section, cardData) {
   //if section in ['Education', 'Experience', 'Skills', 'Projects', 'Interests', 'Awards', 'Languages', 'References'] {

   const { data, error } = await supabase.from("cards").insert([card]);
   if (error) {
      console.error("Error creating card:", error);
      return null;
   }
   console.log("createCard data:", data);
   return data;
}

export async function updateCard(card) {
   const { data, error } = await supabase
      .from("cards")
      .update(card)
      .match({ id: card.id });
   if (error) {
      console.error("Error updating card:", error);
      return null;
   }
   console.log("updateCard data:", data);
   return data;
}

export async function deleteCard(card) {
   const { data, error } = await supabase
      .from("cards")
      .delete()
      .match({ id: card.id });
   if (error) {
      console.error("Error deleting card:", error);
      return null;
   }
   console.log("deleteCard data:", data);
   return data;
}
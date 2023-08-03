import supabase from "../../supabase";

export async function getCards(user) {
   const { data, error } = await supabase
      .rpc('get_combined_data_by_id', { 
         profile_id: user.id
      })
   if (error) {
      console.error("Error getting cards:", error);
      return null;
   }
   console.log("getCards data:", data);
   return data;
}

export async function createCard(section, cardData) {

   // special card
   if (['Education', 'Experience', 'Residence'].find(section)) {
      const { data, error } = await supabase.from(section).insert([cardData]);
      if (error) {
         console.error("Error creating card:", error.message);
         return null;
      }
      console.log("createCard data:", data);
      return data;
   }

   // generic card
   const { data, error } = await supabase.from("cards").insert([card]);
   if (error) {
      console.error("Error creating card:", error);
      return null;
   }
   console.log("createCard data:", data);
   return data;
}

/* export async function updateCard(card) {
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
} */

/* export async function deleteCard(card) {
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
} */
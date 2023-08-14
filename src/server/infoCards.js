import { get } from "http";
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

export async function getCardsBySection(user, section) {
   const { data, error } = await supabase
      .from('profiles')
      .select(section)
      .eq('id', user.id)
   if (error) {
      console.error("Error getting cards from", section,":",error);
      return null;
   }
   console.log("getCardBySection data:", data);
   return data;   
}

export async function appendCard(user, cardData, section) {
   console.log("appendCard cardData:", cardData);
   console.log("appendCard user:", user);
   console.log("appendCard section:", section);
   const { error } = await supabase.rpc('append_entry', {
      column_name: section,
      new_data: JSON.stringify(cardData),
      profile_id: user.id
   })
   if (error) {
      console.error("Error creating card:", error);
      return false;
   }
   return getCardsBySection(user, section);
}

export async function createCard(section, cardData) {
   console.log("createCard section:", section);
   console.log("createCard cardData:", cardData);
   // special card
   if (['education', 'experience', 'residence'].includes(section)) {
      try {
         const { data, error } = await supabase.from(section).upsert([cardData]);
         console.log("createCard data:", data);
         console.log("createCard error:", error);
         if (!error) return data;
      } catch (error) {
         console.error("Error creating card:", error.message);
         return null;
      }
   }

   // generic card
   /* const { data, error } = await supabase.from("cards").insert([card]);
   if (error) {
      console.error("Error creating card:", error);
      return null;
   }
   console.log("createCard data:", data);
   return data; */
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
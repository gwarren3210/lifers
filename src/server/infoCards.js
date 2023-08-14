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
   return data;   
}

export async function appendCard(user, cardData, section) {
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

export async function deleteCards(user, section, cards, cardIds) {
   const filteredCards = cards.filter(( _, i) => !cardIds.includes(i));
   const { error } = await supabase
      .from('profiles')
      .update({ [`${section}`]: filteredCards})
      .eq('id', user.id)
   if (error) {
      console.error("Error deleting card:", error);
      return false;
   }
   return getCardsBySection(user, section);
}
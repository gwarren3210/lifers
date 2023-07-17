import groups from '../data/groups.json';

export default async function createGroup(name, description) {
   const newGroup = {
      name,
      "id": "s",
      "people": ["davidthompson"],
      description
   }
   groups[name] = newGroup;
   console.log(groups);
   return groups
}
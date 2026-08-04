export const isOutOfRange = (desc: string) => {
  const lower = desc.toLowerCase();
  if (lower.includes("ireland")) return false;
  const niTownsAndCounties = [
    "antrim", "armagh", "down", "fermanagh", "londonderry", "derry", "tyrone",
    "aughnacloy", "ballycastle", "ballyclare", "ballymena", "ballymoney", "ballynahinch",
    "banbridge", "bangor", "belfast", "bushmills", "caledon", "carrickfergus", "castlederg",
    "castlewellan", "clogher", "coleraine", "cookstown", "craigavon", "crumlin",
    "donaghadee", "downpatrick", "dromore", "dungannon", "enniskillen", "fivemiletown",
    "hillsborough", "holywood", "larne", "limavady", "lisburn", "maghera", "magherafelt",
    "newcastle", "newry", "newtownabbey", "newtownards", "omagh", "portrush", "portstewart",
    "strabane"
  ];
  if (niTownsAndCounties.some(town => lower.includes(town))) return false;
  if (lower.includes("uk") || lower.includes("united kingdom")) return true;
  return false;
};

import { AddressFinder } from "@ideal-postcodes/address-finder";

AddressFinder.defaults.baseUrl = "api.addresszen.com";
AddressFinder.defaults.defaultCountry = "USA";
AddressFinder.defaults.titleizePostTown = false;

export const AddressLookup = {
  ...AddressFinder,
};

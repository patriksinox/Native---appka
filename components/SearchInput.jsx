import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useState } from "react";
import { icons } from "../constants";
import { usePathname, router } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <>
      <View
        className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex items-center flex-row space-x-4 `}
      >
        <TextInput
          className="mt-0.5 text-base text-white flex-1 font-pregular"
          value={query}
          placeholder="Nájdi video ktoré ťa zaujíma"
          placeholderTextColor="#CDCDE0"
          onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity
          onPress={() => {
            if (!query) {
              return Alert.alert(
                "Chybajúce hľadanie",
                "Prosím zadajte čo hľadáte."
              );
            }
            if (pathname.startsWith("/search")) router.setParams({ query });
            else router.push(`/search/${query}`);
          }}
        >
          <Image
            source={icons.search}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SearchInput;

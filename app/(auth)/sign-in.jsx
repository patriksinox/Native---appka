import { View, Image, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images.js";
import FormField from "../../components/FormField.jsx";
import { useState } from "react";
import CustomButton from "../../components/CustomButton.jsx";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite.js";
import { useGlobalContext } from "../../context/GlobalProvider.js";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSumbitting, setisSumbitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      return Alert.alert("Upozornenie", "Prosím vyplňte všetky polia.");
    }
    setisSumbitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      throw Error(error.message);
    } finally {
      setisSumbitting(false);
    }
  };

  return (
    <SafeAreaView className={`bg-primary h-full`}>
      <ScrollView>
        <View className={`w-full flex min-h-[85vh] justify-center px-4 my-6`}>
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold ">
            Prihlás sa do Aory
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Prihlásiť sa"
            handlePress={submit}
            containerStyles={"mt-7"}
            isLoading={isSumbitting}
          />
          <View className="items-center pt-5 flex-column gap-2">
            <Text className=" text-lg text-gray-100 font-pregular">
              Ešte nemáš účet?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Registrácia
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

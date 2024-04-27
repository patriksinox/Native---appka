import { View, Image, ScrollView, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images.js";
import FormField from "../../components/FormField.jsx";
import { useState } from "react";
import CustomButton from "../../components/CustomButton.jsx";
import { Link, router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider.js";
import { createUser } from "../../lib/appwrite.js";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSumbitting, setisSumbitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      return Alert.alert("Upozornenie", "Prosím vyplňte všetky polia.");
    }
    setisSumbitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

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
        <View className={`w-full flex h-full justify-center px-4 my-6`}>
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-center text-semibold mt-10 font-psemibold ">
            Registrácia
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
          />
          <CustomButton
            title="Registrovať"
            handlePress={submit}
            containerStyles={"mt-7"}
            isLoading={isSumbitting}
          />
          <View className="items-center pt-5 flex-column gap-2">
            <Text className=" text-lg text-gray-100 font-pregular">
              Už máš účet?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Prihlásenie
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

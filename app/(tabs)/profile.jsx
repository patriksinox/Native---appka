import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppWrite from "../../lib/useAppWrite.js";
import VideoCard from "../../components/VideoCard.jsx";
import { useState } from "react";
import { getUserPosts, signOut } from "../../lib/appwrite";
import EmptyState from "../../components/EmptyState.jsx";
import { useGlobalContext } from "../../context/GlobalProvider.js";
import InfoBox from "../../components/InfoBox.jsx";
import { icons } from "../../constants";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppWrite(() => getUserPosts(user.$id));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <>
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity
                className="w-full items-end mb-10"
                onPress={logout}
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="h-6 w-6"
                />
              </TouchableOpacity>
              <View className="w-16 h-16 border-secondary rounded-lg justify-center items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-[90%] h-[90%] rounded-lg"
                  resizeMode="cover"
                />
              </View>
              <InfoBox
                title={user?.username}
                containerStyles={"mt-5"}
                titleStyles="text-lg"
              />
              <View className="mt-5 flex-row flex">
                <InfoBox
                  title={posts?.length || 0}
                  subtitle="Posts"
                  containerStyles={"mr-10"}
                  titleStyles="text-xl"
                />
                <InfoBox
                  title={"1.2k"}
                  subtitle="Zhliadnutí"
                  titleStyles="text-xl"
                />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Žiadne videá"
            subtitle="Žiadne videá sa nenašli pre tento profil"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;

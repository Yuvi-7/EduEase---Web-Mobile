import { Tabs } from "expo-router";
import { Home, Calendar, CreditCard, MessageCircle, TrendingUp } from "lucide-react-native";
import { TabBar } from "@/components/layout/TabBar";

export default function ParentLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} strokeWidth={1.75} />,
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: "Attend.",
          tabBarLabel: "Attend.",
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} strokeWidth={1.75} />,
        }}
      />
      <Tabs.Screen
        name="fees"
        options={{
          title: "Fees",
          tabBarLabel: "Fees",
          tabBarIcon: ({ color, size }) => <CreditCard size={size} color={color} strokeWidth={1.75} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Inbox",
          tabBarLabel: "Inbox",
          tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} strokeWidth={1.75} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarLabel: "Progress",
          tabBarIcon: ({ color, size }) => <TrendingUp size={size} color={color} strokeWidth={1.75} />,
        }}
      />
    </Tabs>
  );
}

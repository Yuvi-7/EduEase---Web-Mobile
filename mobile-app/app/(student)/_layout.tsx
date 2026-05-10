import { Tabs } from "expo-router";
import { Home, BookOpen, CheckSquare, Award, MessageCircle } from "lucide-react-native";
import { TabBar } from "@/components/layout/TabBar";

export default function StudentLayout() {
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
        name="classes"
        options={{
          title: "Classes",
          tabBarLabel: "Classes",
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} strokeWidth={1.75} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarLabel: "Tasks",
          tabBarIcon: ({ color, size }) => <CheckSquare size={size} color={color} strokeWidth={1.75} />,
        }}
      />
      <Tabs.Screen
        name="badges"
        options={{
          title: "Badges",
          tabBarLabel: "Badges",
          tabBarIcon: ({ color, size }) => <Award size={size} color={color} strokeWidth={1.75} />,
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarLabel: "Inbox",
          tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} strokeWidth={1.75} />,
        }}
      />
    </Tabs>
  );
}

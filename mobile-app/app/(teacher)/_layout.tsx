import { Tabs } from "expo-router";
import { Home, BookOpen, ClipboardList, MessageCircle, Calendar } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { TabBar } from "@/components/layout/TabBar";

export default function TeacherLayout() {
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
        name="attendance"
        options={{
          title: "Roll",
          tabBarLabel: "Roll",
          tabBarIcon: ({ color, size }) => <ClipboardList size={size} color={color} strokeWidth={1.75} />,
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
        name="schedule"
        options={{
          title: "Schedule",
          tabBarLabel: "Schedule",
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} strokeWidth={1.75} />,
        }}
      />
    </Tabs>
  );
}

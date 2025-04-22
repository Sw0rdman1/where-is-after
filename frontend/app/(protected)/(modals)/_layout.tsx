import { useAuth } from "@/context/AuthProvider";
import { Stack } from "expo-router";

const COMMON_MODALS = [
    { name: "party/[partyId]", options: { title: "Party" } },
    { name: "venue/[venueId]", options: { title: "Venue" } },
];

const ROLE_MODALS = {
    admin: [],
    user: [
        { name: "qrcode/[qrcodeToken]", options: { title: "QRCode" } },
    ],
    venue: []
};

export default function ModalLayout() {
    const { user } = useAuth();

    const roleModals = user?.role ? ROLE_MODALS[user.role] : [];

    const modalsToShow = [...COMMON_MODALS, ...roleModals];

    return (
        <Stack screenOptions={{ headerShown: false, presentation: 'modal' }}>
            {modalsToShow.map((modal) => (
                <Stack.Screen
                    key={modal.name}
                    name={modal.name}
                    options={modal.options}
                />
            ))}
        </Stack>
    );
}

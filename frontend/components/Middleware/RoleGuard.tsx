import { useAuth } from '@/context/AuthProvider';
import { Role } from '@/models/User';

type RoleGuardProps = {
    allowedRoles: Role[];
    children: React.ReactNode;
};

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
    const { user } = useAuth()

    if (!user || !allowedRoles.includes(user.role)) {
        return null;
    }

    return (
        <>
            {children}
        </>
    );
};

export default RoleGuard;

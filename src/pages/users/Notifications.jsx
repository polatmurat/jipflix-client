import Nav from "../../components/home/Nav";
import { useSelector } from "react-redux";
import { useListNotificationsQuery, useMarkReadMutation } from "../../features/notification/notificationService";
import Spinner from "../../components/skeleton/Spinner";
import { getUserInfo } from "../../utils/jwtUtils";

const Notifications = () => {
    const { userToken, user } = useSelector((s) => s.authReducer);
    const userInfo = getUserInfo(user);
    const { data, isLoading, refetch } = useListNotificationsQuery({ userId: userInfo?.id, page: 0, size: 20 }, { skip: !userToken || !userInfo?.id });
    const [markRead] = useMarkReadMutation();
    const items = data?.result?.items || [];

    const onMarkRead = async (id) => {
        await markRead(id);
        refetch();
    };

    return (
        <>
            <Nav />
            <div className="mt-[100px] pb-[80px] container">
                {isLoading && (<div className="flex justify-center items-center h-screen">
                    <Spinner />
                </div>)}
                <ul className="space-y-3">
                    {items.map((n) => (
                        <li key={n.id} className={`p-4 border rounded ${n.read ? 'bg-gray-50' : 'bg-white'}`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-semibold">{n.title}</div>
                                    <div className="text-sm text-gray-600">{n.message}</div>
                                </div>
                                {!n.read && (
                                    <button className="btn btn-indigo" onClick={() => onMarkRead(n.id)}>Mark as read</button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Notifications;



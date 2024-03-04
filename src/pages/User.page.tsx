import { FC, useCallback, useEffect, useState } from 'react';
import { User } from '../constants/index.ts';
import apiService from '../api/api.ts';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UserPage: FC = () => {
    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();
    const params = useParams();

    const fetchUserData = useCallback(async (userId: number) => {
        const response = await apiService.get('user-info', {
            userId: userId,
        });

        if (response.ok) {
            setUser(response.data);
        } else {
            toast.error('Не вдалося отримати дані');
        }
    }, []);

    useEffect(() => {
        if (!params.id) return;
        fetchUserData(Number(params.id));
    }, [fetchUserData, params.id]);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="user-info">
            <button className="button" onClick={handleBack}>
                Back
            </button>
            {user && (
                <div>
                    <h3>{user.fullName}</h3>
                    <p>{user.username}</p>
                </div>
            )}
        </div>
    );
};

export default UserPage;

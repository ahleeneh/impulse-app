import { useState, useEffect } from 'react';
import axios from 'axios';

function useUserBudget(month, year) {
    const [userBudget, setUserBudget] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getUserBudget = async () => {
        try {
            const response = await axios.get('/budget', {
                params: { month, year }
            });

            if (response.status === 200) {
                setUserBudget(response.data);
            }

            if (response.status === 204) {
                setUserBudget([]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUserBudget();
    }, [month, year]);

    return { userBudget, isLoading, refreshBudget: getUserBudget };

}

export default useUserBudget;
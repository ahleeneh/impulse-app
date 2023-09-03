import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook to fetch user budget data based on month and year
function useUserBudget(month, year) {
    // State to store the user budget data and loading status
    const [userBudget, setUserBudget] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch user budget data
    const getUserBudget = async () => {
        try {
            // Send a GET request to retrieve user budget data
            const response = await axios.get('/budget', {
                params: { month, year }
            });

            if (response.status === 200) {
                // Set userBudget with the fetched data
                setUserBudget(response.data);
            }

            if (response.status === 204) {
                // If no data found, set userBudget state to an empty array
                setUserBudget([]);
            }

        } catch (error) {
            console.error(error);
        } finally {
            // Mark loading as complete, whether successful or not
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // When the component mounts or the month/year changes, fetch the user's budget data
        getUserBudget();
    }, [month, year]);

    return { userBudget, isLoading, refreshBudget: getUserBudget };

}

export default useUserBudget;
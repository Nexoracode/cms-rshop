//import getCookie from "./getCookie";

export const refreshAccessToken = async () => {
    try {

        //const refreshToken = getCookie("refresh_token")
        const refreshToken = "refresh_token"

        if (refreshToken) {

            fetch(`${process.env.BASE_URL}/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token: refreshToken })
            })
                .then(res => res.json())
                .then(data => {

                    const { error, data: resData, statusCode } = data
                    console.log(statusCode);

                    if (!error) {
                        const newAccessToken = resData[0].access_token
                        document.cookie = `access_token=${newAccessToken}; path=/; max-age=870`
                    }

                    if (statusCode === 401) {
                        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        document.cookie = "infos=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    }

                })
                .catch(err => {
                    console.log('Error in refreshAccessToken:', err);
                })

        }

    } catch (error) {
        console.log('Error in refreshAccessToken:', error);
    }
};
function flattenProfile(userProfile) {
    const {
        name,
        address: { city, country, coordinates },
        contact: { phone, email },
        preferences: { notifications }
    } = userProfile;

    return {
        name,
        city,
        country,
        phone,
        email,
        coordinates,
        notifications
    };
}


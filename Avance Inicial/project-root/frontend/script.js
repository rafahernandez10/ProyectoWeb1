document.addEventListener('DOMContentLoaded', () => {
    const ridesList = document.getElementById('rides-list');
    const rideForm = document.getElementById('ride-form');

    // Fetch and display rides
    const fetchRides = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/rides');
            const rides = await response.json();
            ridesList.innerHTML = '';
            rides.forEach(ride => {
                const rideDiv = document.createElement('div');
                rideDiv.className = 'ride';
                rideDiv.innerHTML = `
                    <div>
                        <h3>${ride.driver}</h3>
                        <p>From: ${ride.from}</p>
                        <p>To: ${ride.to}</p>
                        <p>Date: ${new Date(ride.date).toLocaleString()}</p>
                        <p>Seats Available: ${ride.seatsAvailable}</p>
                    </div>
                    <div>
                        <button onclick="editRide('${ride._id}')">Edit</button>
                        <button onclick="deleteRide('${ride._id}')">Delete</button>
                    </div>
                `;
                ridesList.appendChild(rideDiv);
            });
        } catch (error) {
            console.error('Error fetching rides:', error);
        }
    };

    // Add a new ride
    rideForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(rideForm);
        const rideData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/api/rides', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rideData),
            });
            if (response.ok) {
                fetchRides();
                rideForm.reset();
            } else {
                console.error('Error adding ride:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding ride:', error);
        }
    });

    // Edit a ride
    window.editRide = async (id) => {
        const driver = prompt("Enter new driver name:");
        const from = prompt("Enter new start location:");
        const to = prompt("Enter new destination:");
        const date = prompt("Enter new date (YYYY-MM-DDTHH:MM):");
        const seatsAvailable = prompt("Enter new number of seats available:");

        const rideData = {
            driver,
            from,
            to,
            date,
            seatsAvailable
        };

        try {
            const response = await fetch(`http://localhost:3000/api/rides/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rideData),
            });
            if (response.ok) {
                fetchRides();
            } else {
                console.error('Error editing ride:', response.statusText);
            }
        } catch (error) {
            console.error('Error editing ride:', error);
        }
    };

    // Delete a ride
    window.deleteRide = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/rides/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchRides();
            } else {
                console.error('Error deleting ride:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting ride:', error);
        }
    };

    // Initial fetch
    fetchRides();
});

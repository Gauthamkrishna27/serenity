document.addEventListener('DOMContentLoaded', async function() {
    // Show initial loading state
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay active';
    loadingOverlay.innerHTML = '<i class="fas fa-spinner fa-spin fa-2x"></i>';
    document.querySelector('.main-content').appendChild(loadingOverlay);

    try {
        // Load initial booking data
        await updateToBookingsView();
        console.log('Initial booking data loaded');
    } catch (error) {
        console.error('Error loading initial booking data:', error);
    } finally {
        // Remove loading overlay
        loadingOverlay.classList.remove('active');
        setTimeout(() => {
            loadingOverlay.remove();
        }, 300);
    }

    // Set up rooms link
    const roomsLink = document.getElementById('roomsLink');
    if (roomsLink) {
        const oldRoomsLink = roomsLink.cloneNode(true);
        roomsLink.parentNode.replaceChild(oldRoomsLink, roomsLink);
        
        document.getElementById('roomsLink').addEventListener('click', function() {
            console.log('Rooms link clicked - updating table...'); 
            updateToRoomsView();
        });
    }
    
    // Set up bookings link
    const bookingsLink = document.getElementById('bookingsLink');
    if (bookingsLink) {
        const oldBookingsLink = bookingsLink.cloneNode(true);
        bookingsLink.parentNode.replaceChild(oldBookingsLink, bookingsLink);
        
        document.getElementById('bookingsLink').addEventListener('click', function() {
            console.log('Bookings link clicked - updating table...'); 
            updateToBookingsView();
        });
    }

    // Set up guests link
    const guestsLink = document.getElementById('guestsLink');
    if (guestsLink) {
        const oldGuestsLink = guestsLink.cloneNode(true);
        guestsLink.parentNode.replaceChild(oldGuestsLink, guestsLink);

        document.getElementById('guestsLink').addEventListener('click', function () {
            console.log('Guests link clicked - updating table...');
            updateToGuestview(); // Call the function to update the guest table
        });
    }
    
    // Rest of your DOMContentLoaded setup code
    // Add loading animation before data updates
    function showLoading() {
        const loading = document.createElement('div');
        loading.className = 'loading-animation';
        document.querySelector('.recent-bookings').prepend(loading);
        loading.style.display = 'block';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 1000);
    }
    
    // Animate stats when they update
    function updateStats() {
        const stats = document.querySelectorAll('.stat-card');
        stats.forEach(stat => {
            const currentValue = parseInt(stat.querySelector('.value').textContent);
            const newValue = currentValue + Math.floor(Math.random() * 10);
            stat.classList.add('pulse');
            setTimeout(() => {
                stat.querySelector('.value').textContent = newValue;
                stat.classList.remove('pulse');
            }, 1500);
        });
    }
    
    // Enhanced modal functionality
    const modal = document.getElementById("bookingModal");
    const viewButtons = document.querySelectorAll(".view-btn");
    const closeBtn = document.querySelector(".close");
    
    viewButtons.forEach(button => {
        button.addEventListener("click", () => {
            modal.style.display = "block";
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });
    
    closeBtn.addEventListener("click", () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    });
    
    // Auto-update stats periodically
    setInterval(updateStats, 10000); // Updates every 10 seconds
    
    // Add hover effect to table rows
    const tableRows = document.querySelectorAll('.bookings-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseover', () => {
            row.style.transform = 'scale(1.01)';
            row.style.transition = 'transform 0.3s';
        });
        row.addEventListener('mouseout', () => {
            row.style.transform = 'scale(1)';
        });
    });
    
    // Add smooth transitions when switching sections
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            if(e.currentTarget.getAttribute('href') === '#') {
                e.preventDefault();
                showLoading();
            }
        });
    });
    
    // Add interactive features for stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.background = `linear-gradient(145deg, #ffffff, #f8f9fa)`;
        });
    
        card.addEventListener('mouseleave', () => {
            card.style.background = 'white';
        });
    });
    
    // Add interactive header effect
    const header = document.querySelector('.header');
    header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        header.style.background = `linear-gradient(${x * 360}deg, #2c3e50, #3498db)`;
    });
    
    // Quick Actions Functionality
    document.getElementById('addBooking').addEventListener('click', function() {
        modal.style.display = "block";
        modal.classList.add('active');
    });
    
    document.getElementById('generateReport').addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-file-alt"></i> Generate Report';
            alert('Report generated successfully!');
        }, 2000);
    });
    
    // Add this CSS for the rotating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotating {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .rotating i {
            animation: rotating 1s linear infinite;
        }
    `;
    document.head.appendChild(style);
    
    // Table Row Hover Effect
    document.querySelectorAll('.bookings-table tbody tr').forEach(row => {
        row.addEventListener('mousemove', (e) => {
            const rect = row.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            row.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(52, 152, 219, 0.1), transparent)`;
        });
    
        row.addEventListener('mouseleave', () => {
            row.style.background = 'none';
        });
    });
    
    // Refresh button functionality
    const refreshBtn = document.getElementById('refreshData');
    refreshBtn.addEventListener('click', function() {
        // Add rotating animation to button
        this.classList.add('rotating');
        
        // Disable button during refresh
        this.disabled = true;
    
        // Show loading state
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<i class="fas fa-spinner fa-spin fa-2x"></i>';
        document.querySelector('.main-content').appendChild(loadingOverlay);
        
        setTimeout(() => {
            loadingOverlay.classList.add('active');
        }, 0);
    
        // Simulate API call delay
        setTimeout(() => {
            // Update data
            updateStats();
            updateTable();
    
            // Remove loading state
            loadingOverlay.classList.remove('active');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 300);
    
            // Reset button
            this.classList.remove('rotating');
            this.disabled = false;
        }, 1500);
    });
    
    // Reattach event listeners for view buttons after table update
    function reattachViewButtonListeners() {
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(button => {
            button.addEventListener("click", () => {
                modal.style.display = "block";
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
            });
        });
    }
    
    // Call reattachViewButtonListeners after table updates
    const observer = new MutationObserver(() => {
        reattachViewButtonListeners();
    });
    
    observer.observe(document.querySelector('.bookings-table tbody'), {
        childList: true
    });

    // Remove any existing dummy data and load real booking data on page load
    updateToBookingsView(); // This will clear the table and load real booking data
});

// Function to update to rooms view
async function updateToRoomsView() {
    // Update heading
    document.querySelector('#recentBookings h2').textContent = "Room Management";

    // Update table headers
    const tableHeaders = document.querySelectorAll(".bookings-table thead th");
    tableHeaders[0].textContent = "Room ID";
    tableHeaders[1].textContent = "Room Number";
    tableHeaders[2].textContent = "Room Type";
    tableHeaders[3].textContent = "Capacity";
    tableHeaders[4].textContent = "Price per Night";
    tableHeaders[5].textContent = "Status";

    // Clear and update table rows with room data
    const tbody = document.querySelector('.bookings-table tbody');
    tbody.innerHTML = ''; // Clear existing content

    try {
        const response = await fetch('/api/manage/rooms', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Debug log

        const rooms = data.data; // Access the data property from response
        console.log('Rooms Data:', rooms); // Debug log

        if (rooms && Array.isArray(rooms) && rooms.length > 0) {
            rooms.forEach(room => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${room.room_id || 'N/A'}</td>
                    <td>${room.room_number || 'N/A'}</td>
                    <td>${room.room_type || 'N/A'}</td>
                    <td>${room.capacity || 'N/A'}</td>
                    <td>${room.price_per_night || 'N/A'}</td>
                    <td><span class="status ${(room.status || 'vacant').toLowerCase()}">${room.status || 'Vacant'}</span></td>
                    <td><button class="action-btn view-btn">View Details</button></td>
                `;
                tbody.appendChild(row);
            });

            reattachViewButtonListeners();
            console.log('Table updated with room data!');
        } else {
            console.warn('No room data available.');
            tbody.innerHTML = '<tr><td colspan="7">No rooms found.</td></tr>';
        }
    } catch (error) {
        console.error('Error fetching room data:', error);
        tbody.innerHTML = '<tr><td colspan="7">Error loading rooms. Please check the console for details.</td></tr>';
    }
}

// Function to update to bookings view
async function updateToBookingsView() {
    // Update heading
    document.querySelector('#recentBookings h2').textContent = "Recent Bookings";

    // Update table headers
    const tableHeaders = document.querySelectorAll(".bookings-table thead th");
    tableHeaders[0].textContent = "Customer Name";
    tableHeaders[1].textContent = "Customer ID";
    tableHeaders[2].textContent = "Room Number";
    tableHeaders[3].textContent = "Check In";
    tableHeaders[4].textContent = "Check Out";
    tableHeaders[5].textContent = "Status";

    // Clear and update table rows with new booking data
    const tbody = document.querySelector('.bookings-table tbody');
    tbody.innerHTML = ''; // Clear existing content

    try {
        // Fetch booking data from API
        const response = await fetch('/api/manage/booking', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Debug log

        const bookingData = data.data; // Access the data property from response
        console.log('Booking Data:', bookingData); // Debug log

        if (bookingData && Array.isArray(bookingData) && bookingData.length > 0) {
            bookingData.forEach(booking => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${booking.customerName || 'N/A'}</td>
                    <td>${booking.customer_id || 'N/A'}</td>
                    <td>${booking.room_number || 'N/A'}</td>
                    <td>${booking.check_in_date || 'N/A'}</td>
                    <td>${booking.check_out_date || 'N/A'}</td>
                    <td><span class="status ${(booking.status || 'pending').toLowerCase()}">${booking.status || 'Pending'}</span></td>
                    <td><button class="action-btn view-btn">View Details</button></td>
                `;
                tbody.appendChild(row);
            });

            reattachViewButtonListeners();
            console.log('Table updated with new booking data!');
        } else {
            console.warn('No booking data available.');
            tbody.innerHTML = '<tr><td colspan="7">No bookings found.</td></tr>';
        }
    } catch (error) {
        console.error('Error fetching booking data:', error);
        tbody.innerHTML = '<tr><td colspan="7">Error loading bookings. Please check the console for details.</td></tr>';
    }
}

// Function to update statistics
function updateStats() {
    const stats = document.querySelectorAll('.stat-card .value');
    stats.forEach(stat => {
        if(stat.textContent.includes('$')) {
            // Update revenue with random amount between 10000 and 20000
            stat.textContent = '$' + (Math.floor(Math.random() * 10000) + 10000);
        } else {
            // Update other stats with random numbers
            const newValue = Math.floor(Math.random() * 50) + 50;
            stat.textContent = newValue;
        }
    });

}

// Function to update to guest view
async function updateToGuestview() {
    document.querySelector('#recentBookings h2').textContent = "Guest List";

    // Update table headers
    const tableHeaders = document.querySelectorAll(".bookings-table thead th");
    tableHeaders[0].textContent = "Customer ID";
    tableHeaders[1].textContent = "Name";
    tableHeaders[2].textContent = "Email";
    tableHeaders[3].textContent = "Phone";
    tableHeaders[4].textContent = "Address";
    tableHeaders[5].textContent = "Status";

    // Clear and update table rows with guest data
    const tbody = document.querySelector('.bookings-table tbody');
    tbody.innerHTML = ''; // Clear existing content

    try {
        const response = await fetch('/api/manage/customers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Debug log

        const customers = data.data; // Access the data property from response
        console.log('Customers Data:', customers); // Debug log

        if (customers && Array.isArray(customers) && customers.length > 0) {
            customers.forEach(customer => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${customer.customer_id || 'N/A'}</td>
                    <td>${customer.first_name} ${customer.last_name || 'N/A'}</td>
                    <td>${customer.email || 'N/A'}</td>
                    <td>${customer.phone || 'N/A'}</td>
                    <td>${customer.address || 'N/A'}</td>
                    <td><span class="status ${(customer.status || 'active').toLowerCase()}">${customer.status || 'Active'}</span></td>
                    <td><button class="action-btn view-btn">View Details</button></td>
                `;
                tbody.appendChild(row);
            });

            reattachViewButtonListeners();
            console.log('Table updated with customer data!');
        } else {
            console.warn('No customer data available.');
            tbody.innerHTML = '<tr><td colspan="7">No customers found.</td></tr>';
        }
    } catch (error) {
        console.error('Error fetching customer data:', error);
        tbody.innerHTML = '<tr><td colspan="7">Error loading customers. Please check the console for details.</td></tr>';
    }
}

// Function to generate random guest data
function generateGuestData() {
    const firstNames = ['John', 'Emma', 'Michael', 'Sophia', 'Liam', 'Olivia', 'Noah', 'Ava'];
    const lastNames = ['Smith', 'Wilson', 'Brown', 'Johnson', 'Davis', 'Miller', 'Taylor', 'Anderson'];
    const statuses = ['active', 'inactive', 'vip'];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return {
        customerId: 'C' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        phone: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        address: `${Math.floor(Math.random() * 1000 + 1)} Main St, ${cities[Math.floor(Math.random() * cities.length)]}`,
        status: statuses[Math.floor(Math.random() * statuses.length)]
    };
}

// Function to update statistics
function updateStats() {
    const stats = document.querySelectorAll('.stat-card .value');
    stats.forEach(stat => {
        if(stat.textContent.includes('$')) {
            // Update revenue with random amount between 10000 and 20000
            stat.textContent = '$' + (Math.floor(Math.random() * 10000) + 10000);
        } else {
            // Update other stats with random numbers
            const newValue = Math.floor(Math.random() * 50) + 50;
            stat.textContent = newValue;
        }
    });
}

// Refresh button functionality
const refreshBtn = document.getElementById('refreshData');
refreshBtn.addEventListener('click', function() {
    // Add rotating animation to button
    this.classList.add('rotating');
    
    // Disable button during refresh
    this.disabled = true;

    // Show loading state
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<i class="fas fa-spinner fa-spin fa-2x"></i>';
    document.querySelector('.main-content').appendChild(loadingOverlay);
    
    setTimeout(() => {
        loadingOverlay.classList.add('active');
    }, 0);

    // Simulate API call delay
    setTimeout(() => {
        // Update data
        updateStats();
        updateTable();

        // Remove loading state
        loadingOverlay.classList.remove('active');
        setTimeout(() => {
            loadingOverlay.remove();
        }, 300);

        // Reset button
        this.classList.remove('rotating');
        this.disabled = false;
    }, 1500);
});

// Reattach event listeners for view buttons after table update
function reattachViewButtonListeners() {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener("click", () => {
            modal.style.display = "block";
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });
}

// Call reattachViewButtonListeners after table updates
const observer = new MutationObserver(() => {
    reattachViewButtonListeners();
});

observer.observe(document.querySelector('.bookings-table tbody'), {
    childList: true
});
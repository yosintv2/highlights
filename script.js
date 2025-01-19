document.addEventListener("DOMContentLoaded", () => {
    const highlightsDiv = document.getElementById('highlights');

    // Detect the type of highlights to load (cricket or football) using a URL parameter or other logic
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type'); // Example: ?type=cricket or ?type=football

    // Determine which JSON file to fetch
    const jsonFile = type === 'football' ? 'football.json' : 'cricket.json';

    // Fetch the appropriate JSON file and populate the highlights
    fetch(jsonFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                const colDiv = document.createElement('div');
                colDiv.className = 'col-12 col-sm-6 col-lg-4 mb-4'; // Responsive layout with spacing
                colDiv.innerHTML = `
                    <div class="highlight text-center">
                        <a href="${item.link}" target="_blank">
                            <img src="${item.image}" alt="${item.title}">
                        </a>
                        <a href="${item.link}" target="_blank">${item.title}</a>
                    </div>
                `;
                highlightsDiv.appendChild(colDiv);
            });
        })
        .catch(error => console.error('Error fetching highlights:', error));
});

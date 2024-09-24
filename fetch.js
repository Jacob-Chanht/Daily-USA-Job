import dotenv from 'dotenv'; // Import dotenv using ES Module syntax
import fetch from 'node-fetch'; // Import fetch using ES Module syntax
import { writeFile } from 'fs'; // Import the file system module

dotenv.config(); // Load environment variables from .env

const host = 'data.usajobs.gov';
const userAgent = process.env.PERSONALGMAIL;  // Replace with your email
const apiKey = process.env.USAJOBS_API_KEY;  // Access API key from .env

fetch('https://data.usajobs.gov/api/search?ResultsPerPage=1&SortField=DatePosted&SortDirection=Descending', {
    method: 'GET',
    headers: {
        "Host": host,
        "User-Agent": userAgent,
        "Authorization-Key": apiKey
    }
})
.then(response => response.json())
.then(data => {
    // Extract the most recent job posting
    const mostRecentJob = data.SearchResult.SearchResultItems[0].MatchedObjectDescriptor;
    
    // Convert the most recent job JSON to a string format
    const jsonContent = JSON.stringify(mostRecentJob, null, 2); // Pretty print JSON

    // Write the JSON to a file named 'posting.json'
    writeFile('posting.json', jsonContent, 'utf8', (err) => {
        if (err) {
            console.error('An error occurred while writing JSON to file:', err);
        } else {
            console.log('JSON saved to posting.json');
        }
    });
})
.catch(error => {
    console.error('Error fetching job:', error);
});
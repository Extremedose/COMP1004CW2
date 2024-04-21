import exp from 'constants';
const { test, expect } = require('@playwright/test');
const { createClient } = require('@supabase/supabase-js');

const websiteURL = 'https://extremedose.github.io/COMP1004CW2/people.html';

let _supabase;

window.addEventListener('DOMContentLoaded', () => {
    _supabase = createClient('https://xjmheuyoyvjlgfpfwdqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbWhldXlveXZqbGdmcGZ3ZHFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg1MjAzOCwiZXhwIjoyMDI4NDI4MDM4fQ.jbCXYQ_eSysm4rGi5WDKu4e1UUnsmfSBrbC5VPHfV1Q');
});

async function loadData(searchInput = '', selectionName) {
    try {
        let { data, error } = await _supabase
            .from('People')
            .select('*')
            .order('PersonID', { ascending: true });

        let isInput;
        for (let i = 0; i < searchInput.length; i++) {
            if (searchInput.charAt(i) == ' ') {
                isInput = 1;
            } else {
                isInput = 0;
                break;
            }
        }
        if (searchInput && isInput == 0 && selectionName) {
            if (selectionName == "Name") {
                data = data.filter(people => people.Name.toUpperCase().includes(searchInput.toUpperCase()));
            } else if (selectionName == "LicenseNumber") {
                data = data.filter(people => people.LicenseNumber.toUpperCase().includes(searchInput.toUpperCase()));
            }
        }

        const tableBody = document.getElementById('people-table_body');
        tableBody.innerHTML = '';

        data.forEach(people => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${people.PersonID || 'Not Known'}</td>
            <td>${people.Name || 'Not Known'}</td>
            <td>${people.Address || 'Not Known'}</td>
            <td>${people.DOB || 'Not Known'}</td>
            <td>${people.LicenseNumber || 'Not Known'}</td>
            <td>${people.ExpiryDate || 'Not Known'}</td>
          `;
            tableBody.appendChild(row);
        });
        if (data.length == 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.setAttribute('colspan', '6');
            cell.classList.add('no-data-found');
            cell.textContent = 'Person not found';
            row.appendChild(cell);
            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function search() {
    try {
        const searchInput = document.getElementById('searchInputPeople').value.trim();
        const option = document.getElementsByName("search_option");
        let selectedOption = null;
        for (let i = 0; i < option.length; i++) {
            if (option[i].checked) {
                selectedOption = option[i].value;
                break;
            }
        }
        if (selectedOption === 'name') {
            await loadData(searchInput, 'Name');
        } else if (selectedOption === 'license_number') {
            await loadData(searchInput, 'LicenseNumber');
        } else {
            await loadData();
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        await search();
    }
}

window.onload = loadData;

test.beforeEach(async ({ page }) => {
    await page.goto(websiteURL);
});

// HTML tests

test('homepage heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('People Search');
});

test('link - vehicle search', async ({ page }) => {
    await page.click('a[href="/vehicle.html"]');
    await expect(page.locator('h1')).toContainText('Vehicle Search');
});

test('should set the language to English', async ({ page }) => {
    const htmlElement = await page.locator('html');
    expect(htmlElement).toHaveAttribute('lang','en');
});

test('there is a <header> element', async ({ page }) => {
    const headerNum = await page.locator('header').count();
    expect(headerNum).toBeGreaterThan(0);
});

test('there is a <ul> inside <header> for navigation links', async ({ page }) => {
    const ulNum = await page.locator('header ul').count();
    expect(ulNum).toBeGreaterThan(0);
});

test('there are three navigation links (<li>)', async ({ page }) => {
    const liNum = await page.locator('header ul li').count();
    expect(liNum).toBeGreaterThan(2);
});

test('html - image or video', async ({ page }) => {
    const imageNum = await page.locator('aside img').count();
    const videoNum = await page.locator('aside video').count();
    expect(imageNum + videoNum).toBeGreaterThan(0);
});

// CSS tests

test('same external css for all html pages', async ({ page }) => {
    const cssFile = await page.locator('link').getAttribute('href');

    await page.click('a[href="/vehicle.html"]');
    await expect(page.locator('link')).toHaveAttribute('href', cssFile);

    await page.click('a[href="/addvehicle.html"]');
    await expect(page.locator('link')).toHaveAttribute('href', cssFile);
});

test('use css flex to place navigation links horizontally', async ({ page }) => {
    await expect(page.locator('header ul')).toHaveCSS('display', 'flex');
});

test('header should have padding 10px, margin 10px, and border 1px solid black', async ({ page }) => {
    const space = '10px';
    const border = '1px solid rgb(0, 0, 0)';

    await expect(page.locator('header')).toHaveCSS('padding', space);
    await expect(page.locator('header')).toHaveCSS('margin', space);
    await expect(page.locator('header')).toHaveCSS('border', border);
});

test ('CSS grid is used to layout the page components', async({page}) => {
    await expect(page.locator('#container')).toHaveCSS('display','grid');
});

// JavaScript Tests

test ('search "rachel" should return two records', async ({page}) => {
    await page.fill('#name', 'rachel');
    await page.click('button[type="submit"]');
    await page.waitForSelector('#results');
    await expect(page.locator('#results')).toContainText('SG345PQ');
    await expect(page.locator('#results')).toContainText('JK239GB');
    await expect(page.locator('#results div')).toHaveCount(2);
    await expect(page.locator('#message')).toContainText('Search successful');
});

test('search "KWK24JI" should return tesla but no owner', async ({page}) => {
    await page.click('a[href="/vehicle.html"]');
    await page.fill('#rego', 'KWK24JI');
    await page.click('button[type="submit"]');
    await page.waitForSelector('#results');
    await expect(page.locator('#results')).toContainText('Tesla');
    await expect(page.locator('#results div')).toHaveCount(1);
    await expect(page.locator('#message')).toContainText('No result found');
});

test('add a vehicle', async ({page}) => {
    await page.click('a[href="/addvehicle.html"]');
    await page.fill('#rego', 'LKJ23UO');
    await page.fill('#make', 'Porsche');
    await page.fill('#model', 'Taycan');
    await page.fill('#colour', 'white');
    await page.fill('#owner', 'Kai');
    await page.click('button[type="submit"]');

    await page.fill('#personid', '6');
    await page.fill('#name', 'Kai');
    await page.fill('#address', 'Edinburgh');
    await page.fill('#dob', '1990-01-01');
    await page.fill('#license', 'SD876ES');
    await page.fill('#expire', '2030-01-01');
    await page.click('button[type="button"]');
    
    await page.waitForSelector('#message');
    await expect(page.locator('#message')).toContainText('Vehicle added successfully');

    await page.click('a[href="/people.html"]');
    await page.fill('#name', 'Kai');
    await page.click('button[type="submit"]');
    await page.waitForSelector('#results');
    await expect(page.locator('#results')).toContainText('SD876ES');
    await expect(page.locator('#results div')).toHaveCount(1);
});
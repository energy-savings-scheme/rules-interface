let currentPage = 1;
const acpContainerSelector = 'acp-container';
const acpListSelector = 'acp-list';
const moreSelector = 'more-acp';
const dataPerPage = 10;

function getAccreditedSuppliers() {
  return [
    {
      accreditation_name: 'EFSS PDRS HADR',
      accreditation_number: 'ACC0076164',
      accreditation_type: 'Method',
      all_business_appliances:
        'Water heaters (heat pumps)*,Refrigerated display cabinets*,Air conditioners*',
      all_business_other: 'Commercial Lighting',
      company_name: 'Electric Future Sustainability Services Pty Ltd',
      end_date: null,
      id: 1637,
      is_deleted: false,
      organization_name: 'Electric Future Sustainability Services Pty Ltd',
      organization_site: 'https://www.electric-future.com/',
      small_business: 'Water heaters*,Pool pumps*,Air conditioners*,Batteries*',
      start_date: 'Thu, 03 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EC Focus PDRS HADR',
      accreditation_number: 'ACC0076172',
      accreditation_type: 'Method',
      all_business_appliances:
        'Refrigerated cabinets*,Liquid chilling cabinets,Air-conditioners*,Motors*,Gas boilers,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting,NABERS,PIAM&V (all categories)',
      company_name: 'EC Focus Pty Ltd',
      end_date: null,
      id: 1657,
      is_deleted: false,
      organization_name: 'EC Focus Pty Ltd',
      organization_site: 'http://www.energyconservation.com.au/',
      small_business:
        'Air conditioners*,Draught proofing,Lighting,Pool pumps*,Water heaters (gas, heat pumps and solar),Window glazing,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EFSS PDRS HADR',
      accreditation_number: 'ACC0076164',
      accreditation_type: 'Method',
      all_business_appliances:
        'Water heaters (heat pumps)*,Refrigerated display cabinets*,Air conditioners*',
      all_business_other: 'Commercial Lighting',
      company_name: 'Electric Future Sustainability Services Pty Ltd',
      end_date: null,
      id: 1637,
      is_deleted: false,
      organization_name: 'Electric Future Sustainability Services Pty Ltd',
      organization_site: 'https://www.electric-future.com/',
      small_business: 'Water heaters*,Pool pumps*,Air conditioners*,Batteries*',
      start_date: 'Thu, 03 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EC Focus PDRS HADR',
      accreditation_number: 'ACC0076172',
      accreditation_type: 'Method',
      all_business_appliances:
        'Refrigerated cabinets*,Liquid chilling cabinets,Air-conditioners*,Motors*,Gas boilers,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting,NABERS,PIAM&V (all categories)',
      company_name: 'EC Focus Pty Ltd',
      end_date: null,
      id: 1657,
      is_deleted: false,
      organization_name: 'EC Focus Pty Ltd',
      organization_site: 'http://www.energyconservation.com.au/',
      small_business:
        'Air conditioners*,Draught proofing,Lighting,Pool pumps*,Water heaters (gas, heat pumps and solar),Window glazing,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EFSS PDRS HADR',
      accreditation_number: 'ACC0076164',
      accreditation_type: 'Method',
      all_business_appliances:
        'Water heaters (heat pumps)*,Refrigerated display cabinets*,Air conditioners*',
      all_business_other: 'Commercial Lighting',
      company_name: 'Electric Future Sustainability Services Pty Ltd',
      end_date: null,
      id: 1637,
      is_deleted: false,
      organization_name: 'Electric Future Sustainability Services Pty Ltd',
      organization_site: 'https://www.electric-future.com/',
      small_business: 'Water heaters*,Pool pumps*,Air conditioners*,Batteries*',
      start_date: 'Thu, 03 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EC Focus PDRS HADR',
      accreditation_number: 'ACC0076172',
      accreditation_type: 'Method',
      all_business_appliances:
        'Refrigerated cabinets*,Liquid chilling cabinets,Air-conditioners*,Motors*,Gas boilers,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting,NABERS,PIAM&V (all categories)',
      company_name: 'EC Focus Pty Ltd',
      end_date: null,
      id: 1657,
      is_deleted: false,
      organization_name: 'EC Focus Pty Ltd',
      organization_site: 'http://www.energyconservation.com.au/',
      small_business:
        'Air conditioners*,Draught proofing,Lighting,Pool pumps*,Water heaters (gas, heat pumps and solar),Window glazing,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EFSS PDRS HADR',
      accreditation_number: 'ACC0076164',
      accreditation_type: 'Method',
      all_business_appliances:
        'Water heaters (heat pumps)*,Refrigerated display cabinets*,Air conditioners*',
      all_business_other: 'Commercial Lighting',
      company_name: 'Electric Future Sustainability Services Pty Ltd',
      end_date: null,
      id: 1637,
      is_deleted: false,
      organization_name: 'Electric Future Sustainability Services Pty Ltd',
      organization_site: 'https://www.electric-future.com/',
      small_business: 'Water heaters*,Pool pumps*,Air conditioners*,Batteries*',
      start_date: 'Thu, 03 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EC Focus PDRS HADR',
      accreditation_number: 'ACC0076172',
      accreditation_type: 'Method',
      all_business_appliances:
        'Refrigerated cabinets*,Liquid chilling cabinets,Air-conditioners*,Motors*,Gas boilers,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting,NABERS,PIAM&V (all categories)',
      company_name: 'EC Focus Pty Ltd',
      end_date: null,
      id: 1657,
      is_deleted: false,
      organization_name: 'EC Focus Pty Ltd',
      organization_site: 'http://www.energyconservation.com.au/',
      small_business:
        'Air conditioners*,Draught proofing,Lighting,Pool pumps*,Water heaters (gas, heat pumps and solar),Window glazing,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EFSS PDRS HADR',
      accreditation_number: 'ACC0076164',
      accreditation_type: 'Method',
      all_business_appliances:
        'Water heaters (heat pumps)*,Refrigerated display cabinets*,Air conditioners*',
      all_business_other: 'Commercial Lighting',
      company_name: 'Electric Future Sustainability Services Pty Ltd',
      end_date: null,
      id: 1637,
      is_deleted: false,
      organization_name: 'Electric Future Sustainability Services Pty Ltd',
      organization_site: 'https://www.electric-future.com/',
      small_business: 'Water heaters*,Pool pumps*,Air conditioners*,Batteries*',
      start_date: 'Thu, 03 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EC Focus PDRS HADR',
      accreditation_number: 'ACC0076172',
      accreditation_type: 'Method',
      all_business_appliances:
        'Refrigerated cabinets*,Liquid chilling cabinets,Air-conditioners*,Motors*,Gas boilers,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting,NABERS,PIAM&V (all categories)',
      company_name: 'EC Focus Pty Ltd',
      end_date: null,
      id: 1657,
      is_deleted: false,
      organization_name: 'EC Focus Pty Ltd',
      organization_site: 'http://www.energyconservation.com.au/',
      small_business:
        'Air conditioners*,Draught proofing,Lighting,Pool pumps*,Water heaters (gas, heat pumps and solar),Window glazing,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EFSS PDRS HADR',
      accreditation_number: 'ACC0076164',
      accreditation_type: 'Method',
      all_business_appliances:
        'Water heaters (heat pumps)*,Refrigerated display cabinets*,Air conditioners*',
      all_business_other: 'Commercial Lighting',
      company_name: 'Electric Future Sustainability Services Pty Ltd',
      end_date: null,
      id: 1637,
      is_deleted: false,
      organization_name: 'Electric Future Sustainability Services Pty Ltd',
      organization_site: 'https://www.electric-future.com/',
      small_business: 'Water heaters*,Pool pumps*,Air conditioners*,Batteries*',
      start_date: 'Thu, 03 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EC Focus PDRS HADR',
      accreditation_number: 'ACC0076172',
      accreditation_type: 'Method',
      all_business_appliances:
        'Refrigerated cabinets*,Liquid chilling cabinets,Air-conditioners*,Motors*,Gas boilers,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting,NABERS,PIAM&V (all categories)',
      company_name: 'EC Focus Pty Ltd',
      end_date: null,
      id: 1657,
      is_deleted: false,
      organization_name: 'EC Focus Pty Ltd',
      organization_site: 'http://www.energyconservation.com.au/',
      small_business:
        'Air conditioners*,Draught proofing,Lighting,Pool pumps*,Water heaters (gas, heat pumps and solar),Window glazing,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EFSS PDRS HADR',
      accreditation_number: 'ACC0076164',
      accreditation_type: 'Method',
      all_business_appliances:
        'Water heaters (heat pumps)*,Refrigerated display cabinets*,Air conditioners*',
      all_business_other: 'Commercial Lighting',
      company_name: 'Electric Future Sustainability Services Pty Ltd',
      end_date: null,
      id: 1637,
      is_deleted: false,
      organization_name: 'Electric Future Sustainability Services Pty Ltd',
      organization_site: 'https://www.electric-future.com/',
      small_business: 'Water heaters*,Pool pumps*,Air conditioners*,Batteries*',
      start_date: 'Thu, 03 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EC Focus PDRS HADR',
      accreditation_number: 'ACC0076172',
      accreditation_type: 'Method',
      all_business_appliances:
        'Refrigerated cabinets*,Liquid chilling cabinets,Air-conditioners*,Motors*,Gas boilers,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting,NABERS,PIAM&V (all categories)',
      company_name: 'EC Focus Pty Ltd',
      end_date: null,
      id: 1657,
      is_deleted: false,
      organization_name: 'EC Focus Pty Ltd',
      organization_site: 'http://www.energyconservation.com.au/',
      small_business:
        'Air conditioners*,Draught proofing,Lighting,Pool pumps*,Water heaters (gas, heat pumps and solar),Window glazing,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EFSS PDRS HADR',
      accreditation_number: 'ACC0076164',
      accreditation_type: 'Method',
      all_business_appliances:
        'Water heaters (heat pumps)*,Refrigerated display cabinets*,Air conditioners*',
      all_business_other: 'Commercial Lighting',
      company_name: 'Electric Future Sustainability Services Pty Ltd',
      end_date: null,
      id: 1637,
      is_deleted: false,
      organization_name: 'Electric Future Sustainability Services Pty Ltd',
      organization_site: 'https://www.electric-future.com/',
      small_business: 'Water heaters*,Pool pumps*,Air conditioners*,Batteries*',
      start_date: 'Thu, 03 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
    {
      accreditation_name: 'EC Focus PDRS HADR',
      accreditation_number: 'ACC0076172',
      accreditation_type: 'Method',
      all_business_appliances:
        'Refrigerated cabinets*,Liquid chilling cabinets,Air-conditioners*,Motors*,Gas boilers,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting,NABERS,PIAM&V (all categories)',
      company_name: 'EC Focus Pty Ltd',
      end_date: null,
      id: 1657,
      is_deleted: false,
      organization_name: 'EC Focus Pty Ltd',
      organization_site: 'http://www.energyconservation.com.au/',
      small_business:
        'Air conditioners*,Draught proofing,Lighting,Pool pumps*,Water heaters (gas, heat pumps and solar),Window glazing,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Response Capacity - Household Annual Demand Response',
    },
  ];
}

function getMaxPage() {
  return Math.ceil(getAccreditedSuppliers().length / dataPerPage);
}

function paginate(data, page) {
  if (page < 1 || page > getMaxPage()) {
    return [];
  }
  return data.slice((page - 1) * dataPerPage, page * dataPerPage);
}

function extractDomain(websiteUrl) {
  const match = websiteUrl.match(/https?:\/\/(.*?)(\/|$)/);
  return match ? match[1] : null;
}

function generateListSuppliers(data) {
  if (data.length === 0) {
    return '';
  }
  const listTemplate = data.map((item) => {
    return `
            <li>
                  ${item.company_name}: 
                  <a href="${item.organization_site}" class="ext" data-extlink rel="noreferrer">
                  ${extractDomain(item.organization_site)}
                  <svg focusable="false" class="ext" role="img" aria-label="(link is external)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 40"><metadata><sfw xmlns="http://ns.adobe.com/SaveForWeb/1.0/"><slicesourcebounds y="-8160" x="-8165" width="16389" height="16384" bottomleftorigin="true"></slicesourcebounds><optimizationsettings><targetsettings targetsettingsid="0" fileformat="PNG24Format"><png24format transparency="true" filtered="false" interlaced="false" nomattecolor="false" mattecolor="#FFFFFF"></png24format></targetsettings></optimizationsettings></sfw></metadata><title>(link is external)</title><path d="M48 26c-1.1 0-2 0.9-2 2v26H10V18h26c1.1 0 2-0.9 2-2s-0.9-2-2-2H8c-1.1 0-2 0.9-2 2v40c0 1.1 0.9 2 2 2h40c1.1 0 2-0.9 2-2V28C50 26.9 49.1 26 48 26z"></path><path d="M56 6H44c-1.1 0-2 0.9-2 2s0.9 2 2 2h7.2L30.6 30.6c-0.8 0.8-0.8 2 0 2.8C31 33.8 31.5 34 32 34s1-0.2 1.4-0.6L54 12.8V20c0 1.1 0.9 2 2 2s2-0.9 2-2V8C58 6.9 57.1 6 56 6z"></path></svg>
                  </a>  
            </li>
        `;
  });

  return listTemplate.join('');
}

function loadMore() {
  currentPage += 1;
  const data = getAccreditedSuppliers();
  const slicedData = paginate(data, currentPage);
  document.querySelector(`#${acpListSelector}`).innerHTML += generateListSuppliers(slicedData);

  if (currentPage === getMaxPage()) {
    document.querySelector(`#${moreSelector}`).style.display = 'none';
  }
}

function init() {
  const data = getAccreditedSuppliers();
  const slicedData = paginate(data, currentPage);
  const listTemplate = `<ul id="${acpListSelector}">${generateListSuppliers(slicedData)}</ul>`;
  const pageElStyle = `display: ${
    data.length > dataPerPage ? 'block' : 'none'
  }; cursor: pointer; color: blue;`;
  const pageTemplate = `<div id="${moreSelector}" style="${pageElStyle}" onclick="loadMore()">More...</div>`;

  document.querySelector(`#${acpContainerSelector}`).innerHTML = listTemplate + pageTemplate;
}

init();

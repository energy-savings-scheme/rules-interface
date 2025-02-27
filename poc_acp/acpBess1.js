let currentPage = 1;
const acpContainerSelector = 'acp-container';
const acpListSelector = 'acp-list';
const moreSelector = 'more-acp';
const dataPerPage = 10;

function getAccreditedSuppliers() {
  return [
    {
      accreditation_name: 'GBET PDRS SASC',
      accreditation_number: 'ACC0076180',
      accreditation_type: 'Method',
      all_business_appliances: 'Water heaters',
      all_business_other: '-',
      company_name: 'GB Environmental Trading Pty Ltd',
      end_date: null,
      id: 1636,
      is_deleted: false,
      organization_name: 'GB ENVIRONMENTAL TRADING PTY LTD',
      organization_site: 'https://www.green-bank.com.au/',
      small_business: 'Water heaters (heat pumps and solar),Batteries*',
      start_date: 'Tue, 01 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'EFSS  PDRS SASC',
      accreditation_number: 'ACC0076165',
      accreditation_type: 'Method',
      all_business_appliances:
        'Water heaters (heat pumps)*,Refrigerated display cabinets*,Air conditioners*',
      all_business_other: 'Commercial Lighting',
      company_name: 'Electric Future Sustainability Services Pty Ltd',
      end_date: null,
      id: 1638,
      is_deleted: false,
      organization_name: 'Electric Future Sustainability Services Pty Ltd',
      organization_site: 'https://www.electric-future.com/',
      small_business: 'Water heaters*,Pool pumps*,Air conditioners*,Batteries*',
      start_date: 'Thu, 03 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'NCBA PDRS SASC',
      accreditation_number: 'ACC0076169',
      accreditation_type: 'Method',
      all_business_appliances: 'Refrigerated cabinets*,Air conditioners*,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting',
      company_name: 'National Carbon Bank of Australia Pty Ltd',
      end_date: null,
      id: 1642,
      is_deleted: false,
      organization_name: 'National Carbon Bank of Australia Pty Ltd',
      organization_site: 'http://www.nationalcarbonbank.com.au/',
      small_business:
        'Pool pumps*,Air conditioners*,Water heaters (gas, heat pumps and solar),Lighting,Batteries*',
      start_date: 'Thu, 10 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'VPC PDRS SASC',
      accreditation_number: 'ACC0076192',
      accreditation_type: 'Method',
      all_business_appliances: '-',
      all_business_other: '-',
      company_name: 'Virtual Power Co Pty Ltd',
      end_date: null,
      id: 1644,
      is_deleted: false,
      organization_name: 'Virtual Power Co Pty Ltd',
      organization_site: 'https://www.virtualpowerco.com.au/',
      small_business: 'Batteries*',
      start_date: 'Thu, 10 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'Kass & Co PDRS SASC',
      accreditation_number: 'ACC0076184',
      accreditation_type: 'Method',
      all_business_appliances: 'Water heaters (heat pumps)*,Air conditioners*,Gas boilers',
      all_business_other: 'Commercial lighting',
      company_name: 'Kass & Co Pty Ltd (trading as 4 EVA Energy)',
      end_date: null,
      id: 1647,
      is_deleted: false,
      organization_name: 'Kass & Co Pty Limited',
      organization_site: 'https://www.4evaenergy.com/',
      small_business: 'Lighting,Water heaters,Air conditioners*,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'EC Focus PDRS SASC',
      accreditation_number: 'ACC0076171',
      accreditation_type: 'Method',
      all_business_appliances:
        'Refrigerated cabinets*,Liquid chilling cabinets,Air-conditioners*,Motors*,Gas boilers,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting,NABERS,PIAM&V (all categories)',
      company_name: 'EC Focus Pty Ltd',
      end_date: null,
      id: 1661,
      is_deleted: false,
      organization_name: 'EC Focus Pty Ltd',
      organization_site: 'http://www.energyconservation.com.au/',
      small_business:
        'Air conditioners*,Draught proofing,Lighting,Pool pumps*,Water heaters (gas, heat pumps and solar),Window glazing,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'TIG PDRS SASC',
      accreditation_number: 'ACC0076168',
      accreditation_type: 'Method',
      all_business_appliances: '-',
      all_business_other: '-',
      company_name: 'Trade in Green Pty Ltd',
      end_date: null,
      id: 1662,
      is_deleted: false,
      organization_name: 'Trade In Green Pty Ltd',
      organization_site: 'https://www.tradeingreen.com.au/',
      small_business: 'Batteries*',
      start_date: 'Thu, 17 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'GBET PDRS SASC',
      accreditation_number: 'ACC0076180',
      accreditation_type: 'Method',
      all_business_appliances: 'Water heaters',
      all_business_other: '-',
      company_name: 'GB Environmental Trading Pty Ltd',
      end_date: null,
      id: 1636,
      is_deleted: false,
      organization_name: 'GB ENVIRONMENTAL TRADING PTY LTD',
      organization_site: 'https://www.green-bank.com.au/',
      small_business: 'Water heaters (heat pumps and solar),Batteries*',
      start_date: 'Tue, 01 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'EFSS  PDRS SASC',
      accreditation_number: 'ACC0076165',
      accreditation_type: 'Method',
      all_business_appliances:
        'Water heaters (heat pumps)*,Refrigerated display cabinets*,Air conditioners*',
      all_business_other: 'Commercial Lighting',
      company_name: 'Electric Future Sustainability Services Pty Ltd',
      end_date: null,
      id: 1638,
      is_deleted: false,
      organization_name: 'Electric Future Sustainability Services Pty Ltd',
      organization_site: 'https://www.electric-future.com/',
      small_business: 'Water heaters*,Pool pumps*,Air conditioners*,Batteries*',
      start_date: 'Thu, 03 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'NCBA PDRS SASC',
      accreditation_number: 'ACC0076169',
      accreditation_type: 'Method',
      all_business_appliances: 'Refrigerated cabinets*,Air conditioners*,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting',
      company_name: 'National Carbon Bank of Australia Pty Ltd',
      end_date: null,
      id: 1642,
      is_deleted: false,
      organization_name: 'National Carbon Bank of Australia Pty Ltd',
      organization_site: 'http://www.nationalcarbonbank.com.au/',
      small_business:
        'Pool pumps*,Air conditioners*,Water heaters (gas, heat pumps and solar),Lighting,Batteries*',
      start_date: 'Thu, 10 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'VPC PDRS SASC',
      accreditation_number: 'ACC0076192',
      accreditation_type: 'Method',
      all_business_appliances: '-',
      all_business_other: '-',
      company_name: 'Virtual Power Co Pty Ltd',
      end_date: null,
      id: 1644,
      is_deleted: false,
      organization_name: 'Virtual Power Co Pty Ltd',
      organization_site: 'https://www.virtualpowerco.com.au/',
      small_business: 'Batteries*',
      start_date: 'Thu, 10 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'Kass & Co PDRS SASC',
      accreditation_number: 'ACC0076184',
      accreditation_type: 'Method',
      all_business_appliances: 'Water heaters (heat pumps)*,Air conditioners*,Gas boilers',
      all_business_other: 'Commercial lighting',
      company_name: 'Kass & Co Pty Ltd (trading as 4 EVA Energy)',
      end_date: null,
      id: 1647,
      is_deleted: false,
      organization_name: 'Kass & Co Pty Limited',
      organization_site: 'https://www.4evaenergy.com/',
      small_business: 'Lighting,Water heaters,Air conditioners*,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'EC Focus PDRS SASC',
      accreditation_number: 'ACC0076171',
      accreditation_type: 'Method',
      all_business_appliances:
        'Refrigerated cabinets*,Liquid chilling cabinets,Air-conditioners*,Motors*,Gas boilers,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting,NABERS,PIAM&V (all categories)',
      company_name: 'EC Focus Pty Ltd',
      end_date: null,
      id: 1661,
      is_deleted: false,
      organization_name: 'EC Focus Pty Ltd',
      organization_site: 'http://www.energyconservation.com.au/',
      small_business:
        'Air conditioners*,Draught proofing,Lighting,Pool pumps*,Water heaters (gas, heat pumps and solar),Window glazing,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'TIG PDRS SASC',
      accreditation_number: 'ACC0076168',
      accreditation_type: 'Method',
      all_business_appliances: '-',
      all_business_other: '-',
      company_name: 'Trade in Green Pty Ltd',
      end_date: null,
      id: 1662,
      is_deleted: false,
      organization_name: 'Trade In Green Pty Ltd',
      organization_site: 'https://www.tradeingreen.com.au/',
      small_business: 'Batteries*',
      start_date: 'Thu, 17 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'GBET PDRS SASC',
      accreditation_number: 'ACC0076180',
      accreditation_type: 'Method',
      all_business_appliances: 'Water heaters',
      all_business_other: '-',
      company_name: 'GB Environmental Trading Pty Ltd',
      end_date: null,
      id: 1636,
      is_deleted: false,
      organization_name: 'GB ENVIRONMENTAL TRADING PTY LTD',
      organization_site: 'https://www.green-bank.com.au/',
      small_business: 'Water heaters (heat pumps and solar),Batteries*',
      start_date: 'Tue, 01 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'EFSS  PDRS SASC',
      accreditation_number: 'ACC0076165',
      accreditation_type: 'Method',
      all_business_appliances:
        'Water heaters (heat pumps)*,Refrigerated display cabinets*,Air conditioners*',
      all_business_other: 'Commercial Lighting',
      company_name: 'Electric Future Sustainability Services Pty Ltd',
      end_date: null,
      id: 1638,
      is_deleted: false,
      organization_name: 'Electric Future Sustainability Services Pty Ltd',
      organization_site: 'https://www.electric-future.com/',
      small_business: 'Water heaters*,Pool pumps*,Air conditioners*,Batteries*',
      start_date: 'Thu, 03 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'NCBA PDRS SASC',
      accreditation_number: 'ACC0076169',
      accreditation_type: 'Method',
      all_business_appliances: 'Refrigerated cabinets*,Air conditioners*,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting',
      company_name: 'National Carbon Bank of Australia Pty Ltd',
      end_date: null,
      id: 1642,
      is_deleted: false,
      organization_name: 'National Carbon Bank of Australia Pty Ltd',
      organization_site: 'http://www.nationalcarbonbank.com.au/',
      small_business:
        'Pool pumps*,Air conditioners*,Water heaters (gas, heat pumps and solar),Lighting,Batteries*',
      start_date: 'Thu, 10 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'VPC PDRS SASC',
      accreditation_number: 'ACC0076192',
      accreditation_type: 'Method',
      all_business_appliances: '-',
      all_business_other: '-',
      company_name: 'Virtual Power Co Pty Ltd',
      end_date: null,
      id: 1644,
      is_deleted: false,
      organization_name: 'Virtual Power Co Pty Ltd',
      organization_site: 'https://www.virtualpowerco.com.au/',
      small_business: 'Batteries*',
      start_date: 'Thu, 10 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'Kass & Co PDRS SASC',
      accreditation_number: 'ACC0076184',
      accreditation_type: 'Method',
      all_business_appliances: 'Water heaters (heat pumps)*,Air conditioners*,Gas boilers',
      all_business_other: 'Commercial lighting',
      company_name: 'Kass & Co Pty Ltd (trading as 4 EVA Energy)',
      end_date: null,
      id: 1647,
      is_deleted: false,
      organization_name: 'Kass & Co Pty Limited',
      organization_site: 'https://www.4evaenergy.com/',
      small_business: 'Lighting,Water heaters,Air conditioners*,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'EC Focus PDRS SASC',
      accreditation_number: 'ACC0076171',
      accreditation_type: 'Method',
      all_business_appliances:
        'Refrigerated cabinets*,Liquid chilling cabinets,Air-conditioners*,Motors*,Gas boilers,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting,NABERS,PIAM&V (all categories)',
      company_name: 'EC Focus Pty Ltd',
      end_date: null,
      id: 1661,
      is_deleted: false,
      organization_name: 'EC Focus Pty Ltd',
      organization_site: 'http://www.energyconservation.com.au/',
      small_business:
        'Air conditioners*,Draught proofing,Lighting,Pool pumps*,Water heaters (gas, heat pumps and solar),Window glazing,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'TIG PDRS SASC',
      accreditation_number: 'ACC0076168',
      accreditation_type: 'Method',
      all_business_appliances: '-',
      all_business_other: '-',
      company_name: 'Trade in Green Pty Ltd',
      end_date: null,
      id: 1662,
      is_deleted: false,
      organization_name: 'Trade In Green Pty Ltd',
      organization_site: 'https://www.tradeingreen.com.au/',
      small_business: 'Batteries*',
      start_date: 'Thu, 17 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'GBET PDRS SASC',
      accreditation_number: 'ACC0076180',
      accreditation_type: 'Method',
      all_business_appliances: 'Water heaters',
      all_business_other: '-',
      company_name: 'GB Environmental Trading Pty Ltd',
      end_date: null,
      id: 1636,
      is_deleted: false,
      organization_name: 'GB ENVIRONMENTAL TRADING PTY LTD',
      organization_site: 'https://www.green-bank.com.au/',
      small_business: 'Water heaters (heat pumps and solar),Batteries*',
      start_date: 'Tue, 01 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'EFSS  PDRS SASC',
      accreditation_number: 'ACC0076165',
      accreditation_type: 'Method',
      all_business_appliances:
        'Water heaters (heat pumps)*,Refrigerated display cabinets*,Air conditioners*',
      all_business_other: 'Commercial Lighting',
      company_name: 'Electric Future Sustainability Services Pty Ltd',
      end_date: null,
      id: 1638,
      is_deleted: false,
      organization_name: 'Electric Future Sustainability Services Pty Ltd',
      organization_site: 'https://www.electric-future.com/',
      small_business: 'Water heaters*,Pool pumps*,Air conditioners*,Batteries*',
      start_date: 'Thu, 03 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'NCBA PDRS SASC',
      accreditation_number: 'ACC0076169',
      accreditation_type: 'Method',
      all_business_appliances: 'Refrigerated cabinets*,Air conditioners*,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting',
      company_name: 'National Carbon Bank of Australia Pty Ltd',
      end_date: null,
      id: 1642,
      is_deleted: false,
      organization_name: 'National Carbon Bank of Australia Pty Ltd',
      organization_site: 'http://www.nationalcarbonbank.com.au/',
      small_business:
        'Pool pumps*,Air conditioners*,Water heaters (gas, heat pumps and solar),Lighting,Batteries*',
      start_date: 'Thu, 10 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'VPC PDRS SASC',
      accreditation_number: 'ACC0076192',
      accreditation_type: 'Method',
      all_business_appliances: '-',
      all_business_other: '-',
      company_name: 'Virtual Power Co Pty Ltd',
      end_date: null,
      id: 1644,
      is_deleted: false,
      organization_name: 'Virtual Power Co Pty Ltd',
      organization_site: 'https://www.virtualpowerco.com.au/',
      small_business: 'Batteries*',
      start_date: 'Thu, 10 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'Kass & Co PDRS SASC',
      accreditation_number: 'ACC0076184',
      accreditation_type: 'Method',
      all_business_appliances: 'Water heaters (heat pumps)*,Air conditioners*,Gas boilers',
      all_business_other: 'Commercial lighting',
      company_name: 'Kass & Co Pty Ltd (trading as 4 EVA Energy)',
      end_date: null,
      id: 1647,
      is_deleted: false,
      organization_name: 'Kass & Co Pty Limited',
      organization_site: 'https://www.4evaenergy.com/',
      small_business: 'Lighting,Water heaters,Air conditioners*,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'EC Focus PDRS SASC',
      accreditation_number: 'ACC0076171',
      accreditation_type: 'Method',
      all_business_appliances:
        'Refrigerated cabinets*,Liquid chilling cabinets,Air-conditioners*,Motors*,Gas boilers,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting,NABERS,PIAM&V (all categories)',
      company_name: 'EC Focus Pty Ltd',
      end_date: null,
      id: 1661,
      is_deleted: false,
      organization_name: 'EC Focus Pty Ltd',
      organization_site: 'http://www.energyconservation.com.au/',
      small_business:
        'Air conditioners*,Draught proofing,Lighting,Pool pumps*,Water heaters (gas, heat pumps and solar),Window glazing,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'TIG PDRS SASC',
      accreditation_number: 'ACC0076168',
      accreditation_type: 'Method',
      all_business_appliances: '-',
      all_business_other: '-',
      company_name: 'Trade in Green Pty Ltd',
      end_date: null,
      id: 1662,
      is_deleted: false,
      organization_name: 'Trade In Green Pty Ltd',
      organization_site: 'https://www.tradeingreen.com.au/',
      small_business: 'Batteries*',
      start_date: 'Thu, 17 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'GBET PDRS SASC',
      accreditation_number: 'ACC0076180',
      accreditation_type: 'Method',
      all_business_appliances: 'Water heaters',
      all_business_other: '-',
      company_name: 'GB Environmental Trading Pty Ltd',
      end_date: null,
      id: 1636,
      is_deleted: false,
      organization_name: 'GB ENVIRONMENTAL TRADING PTY LTD',
      organization_site: 'https://www.green-bank.com.au/',
      small_business: 'Water heaters (heat pumps and solar),Batteries*',
      start_date: 'Tue, 01 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'EFSS  PDRS SASC',
      accreditation_number: 'ACC0076165',
      accreditation_type: 'Method',
      all_business_appliances:
        'Water heaters (heat pumps)*,Refrigerated display cabinets*,Air conditioners*',
      all_business_other: 'Commercial Lighting',
      company_name: 'Electric Future Sustainability Services Pty Ltd',
      end_date: null,
      id: 1638,
      is_deleted: false,
      organization_name: 'Electric Future Sustainability Services Pty Ltd',
      organization_site: 'https://www.electric-future.com/',
      small_business: 'Water heaters*,Pool pumps*,Air conditioners*,Batteries*',
      start_date: 'Thu, 03 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'NCBA PDRS SASC',
      accreditation_number: 'ACC0076169',
      accreditation_type: 'Method',
      all_business_appliances: 'Refrigerated cabinets*,Air conditioners*,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting',
      company_name: 'National Carbon Bank of Australia Pty Ltd',
      end_date: null,
      id: 1642,
      is_deleted: false,
      organization_name: 'National Carbon Bank of Australia Pty Ltd',
      organization_site: 'http://www.nationalcarbonbank.com.au/',
      small_business:
        'Pool pumps*,Air conditioners*,Water heaters (gas, heat pumps and solar),Lighting,Batteries*',
      start_date: 'Thu, 10 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'VPC PDRS SASC',
      accreditation_number: 'ACC0076192',
      accreditation_type: 'Method',
      all_business_appliances: '-',
      all_business_other: '-',
      company_name: 'Virtual Power Co Pty Ltd',
      end_date: null,
      id: 1644,
      is_deleted: false,
      organization_name: 'Virtual Power Co Pty Ltd',
      organization_site: 'https://www.virtualpowerco.com.au/',
      small_business: 'Batteries*',
      start_date: 'Thu, 10 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'Kass & Co PDRS SASC',
      accreditation_number: 'ACC0076184',
      accreditation_type: 'Method',
      all_business_appliances: 'Water heaters (heat pumps)*,Air conditioners*,Gas boilers',
      all_business_other: 'Commercial lighting',
      company_name: 'Kass & Co Pty Ltd (trading as 4 EVA Energy)',
      end_date: null,
      id: 1647,
      is_deleted: false,
      organization_name: 'Kass & Co Pty Limited',
      organization_site: 'https://www.4evaenergy.com/',
      small_business: 'Lighting,Water heaters,Air conditioners*,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'EC Focus PDRS SASC',
      accreditation_number: 'ACC0076171',
      accreditation_type: 'Method',
      all_business_appliances:
        'Refrigerated cabinets*,Liquid chilling cabinets,Air-conditioners*,Motors*,Gas boilers,Water heaters*',
      all_business_other: 'Commercial lighting,Public lighting,NABERS,PIAM&V (all categories)',
      company_name: 'EC Focus Pty Ltd',
      end_date: null,
      id: 1661,
      is_deleted: false,
      organization_name: 'EC Focus Pty Ltd',
      organization_site: 'http://www.energyconservation.com.au/',
      small_business:
        'Air conditioners*,Draught proofing,Lighting,Pool pumps*,Water heaters (gas, heat pumps and solar),Window glazing,Batteries*',
      start_date: 'Wed, 16 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
    },
    {
      accreditation_name: 'TIG PDRS SASC',
      accreditation_number: 'ACC0076168',
      accreditation_type: 'Method',
      all_business_appliances: '-',
      all_business_other: '-',
      company_name: 'Trade in Green Pty Ltd',
      end_date: null,
      id: 1662,
      is_deleted: false,
      organization_name: 'Trade In Green Pty Ltd',
      organization_site: 'https://www.tradeingreen.com.au/',
      small_business: 'Batteries*',
      start_date: 'Thu, 17 Oct 2024 00:00:00 GMT',
      value: 'Peak Demand Shifting Capacity - Store and Shift Capacity',
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

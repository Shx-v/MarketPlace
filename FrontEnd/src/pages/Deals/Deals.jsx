import React, { useState } from 'react';
import {
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { apiData } from 'src/apidata';
import DealDisplay from 'src/components/DealDisplay/DealDisplay';
import CombinationOrderModal from './Modals/CombinationOrderModal';

const Deals = () => {
  const [providers, setProviders] = useState([]);
  const [services, setServices] = useState([]);
  const serviceTypes = [
    { name: 'Project Management', value: 'Project Management' },
    { name: 'Customer Relationship', value: 'CRM' },
    { name: 'Marketing Automation', value: 'Marketing Automation' },
    { name: 'Analytics and Business Intelligence', value: 'Analytics and Business Intelligence' },
    { name: 'Human Resource', value: 'HR' },
  ];
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);
  const [budget, setBudget] = useState('');
  const [topCombinations, setTopCombinations] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCombination, setSelectedCombination] = useState([]);

  const handleProviderChange = (provider) => {
    setSelectedProviders((prev) =>
      prev.includes(provider) ? prev.filter((p) => p !== provider) : [...prev, provider]
    );
  };

  const handleServiceTypeChange = (type) => {
    setSelectedServiceTypes((prev) => {
      const isSelected = prev.some((selected) => selected.value === type.value);

      if (isSelected) {
        return prev.filter((selected) => selected.value !== type.value);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleGetProviders = async () => {
    try {
      const response = await axios.get(`${apiData.base}/api/v1/providers`);
      const data = response.data.EncryptedResponse;
      if (data.success) {
        setProviders(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleGetServices = async () => {
    try {
      const response = await axios.get(`${apiData.base}/api/v1/services`);
      const data = response.data.EncryptedResponse;
      setServices(data.data.services);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const filterServicesByProviders = (services, selectedProviders) => {
    const providerIds = selectedProviders.map((item) => item._id);
    return services.filter((service) => providerIds.includes(service.provider._id));
  };

  const filterServicesByCategory = (services, selectedServiceTypes) => {
    const categoryValues = selectedServiceTypes.map((item) => item.value);
    return services.filter((service) => categoryValues.includes(service.category));
  };

  const generateCategoryCombinations = (services, selectedServiceTypes) => {
    const serviceGroups = selectedServiceTypes.reduce((acc, type) => {
      acc[type.value] = services.filter((service) => service.category === type.value);
      return acc;
    }, {});

    const generateCombinations = (currentCombo, typeIndex) => {
      if (typeIndex === selectedServiceTypes.length) {
        return [currentCombo];
      }

      const type = selectedServiceTypes[typeIndex].value;
      const group = serviceGroups[type] || [];
      if (group.length === 0) return [];

      const combinations = [];
      for (const service of group) {
        const newCombo = [...currentCombo, service];
        combinations.push(...generateCombinations(newCombo, typeIndex + 1));
      }

      return combinations;
    };

    return generateCombinations([], 0);
  };

  const filterCombinationsByBudget = (combinations, budget) => {
    return combinations.filter(
      (combo) => combo.reduce((total, service) => total + service.price, 0) <= budget
    );
  };

  const filterTopCombinationsByRating = (combinations) => {
    return combinations
      .map((combo) => ({
        combination: combo,
        ratingSum: combo.reduce((total, service) => total + service.averageRating, 0),
      }))
      .sort((a, b) => b.ratingSum - a.ratingSum)
      .slice(0, 3)
      .map((item) => item.combination);
  };

  const handleFindCombinations = () => {
    const filteredByProviders = filterServicesByProviders(services, selectedProviders);
    const filtered = filterServicesByCategory(filteredByProviders, selectedServiceTypes);
    const combination = generateCategoryCombinations(filtered, selectedServiceTypes);
    const underBudgetCombinations = filterCombinationsByBudget(combination, budget);
    const bestCombination = filterTopCombinationsByRating(underBudgetCombinations);
    setTopCombinations(bestCombination);

    console.log(bestCombination);
  };

  const handleBuyOpen = (combination) => {
    setOpen(true);
    console.log(combination);
    setSelectedCombination(combination);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedCombination([]);
  };

  useEffect(() => {
    handleGetProviders();
    handleGetServices();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 10 }}
    >
      <Typography
        variant="h4"
        gutterBottom
      >
        Find the Best Deals
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
      >
        Select Providers
      </Typography>
      <FormGroup row>
        {providers.map((provider, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                value={provider}
                checked={selectedProviders.includes(provider)}
                onChange={() => handleProviderChange(provider)}
              />
            }
            label={provider.name}
          />
        ))}
      </FormGroup>

      <Typography
        variant="h6"
        gutterBottom
      >
        Select Service Types
      </Typography>
      <FormGroup row>
        {serviceTypes.map((type, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                value={type.value}
                checked={selectedServiceTypes.some((selected) => selected.value === type.value)}
                onChange={() => handleServiceTypeChange(type)}
              />
            }
            label={type.name}
          />
        ))}
      </FormGroup>

      <Typography
        variant="h6"
        gutterBottom
        style={{ marginTop: '20px' }}
      >
        Enter Budget
      </Typography>
      <TextField
        fullWidth
        type="number"
        label="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        variant="outlined"
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleFindCombinations}
        style={{ marginTop: '20px' }}
      >
        Find Deals
      </Button>
      <DealDisplay
        data={topCombinations}
        onBuy={handleBuyOpen}
      />
      <CombinationOrderModal
        open={open}
        handleClose={handleClose}
        combination={selectedCombination}
      />
    </Container>
  );
};

export default Deals;

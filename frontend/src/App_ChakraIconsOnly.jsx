import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortingDropdown from './components/SortingDropdown';
import TransactionTable from './components/TransactionTable';
import Pagination from './components/Pagination';

const API_BASE_URL = 'http://localhost:4000/api';

export default function App() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();
  
  const PAGE_SIZE = 10;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      
      if (search) params.set('search', search);
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
      
      if (sortBy) {
        params.set('sort_by', sortBy);
        params.set('sort_order', sortBy === 'Date' ? 'desc' : 'asc');
      }
      
      params.set('page', page);
      params.set('page_size', PAGE_SIZE);

      const response = await fetch(`${API_BASE_URL}/transactions?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      
      const data = await response.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      setError(err.message);
      toast({
        title: 'Error fetching data',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchData();
  };

  const handleApplyFilters = () => {
    setPage(1);
    fetchData();
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearch('');
    setSortBy('');
    setPage(1);
    setTimeout(fetchData, 0);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setPage(1);
    setTimeout(fetchData, 0);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box
        bgGradient="linear(135deg, brand.500 0%, secondary.500 100%)"
        color="white"
        py={{ base: 8, md: 12 }}
        px={6}
        textAlign="center"
        boxShadow="2xl"
        position="relative"
        overflow="hidden"
      >
        <VStack spacing={3} position="relative" zIndex={1}>
          <HStack spacing={3} justify="center">
            <Text fontSize="4xl">🏠</Text>
            <Heading
              as="h1"
              size={{ base: 'xl', md: '2xl' }}
              fontWeight="bold"
              letterSpacing="tight"
              textShadow="0 2px 10px rgba(0,0,0,0.2)"
            >
              TruEstate
            </Heading>
          </HStack>
          <Text fontSize={{ base: 'lg', md: 'xl' }} opacity={0.95} fontWeight="medium">
            Retail Sales Management System
          </Text>
        </VStack>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} align="stretch">
          <SearchBar
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
          />

          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />

          <Flex
            bg="white"
            p={5}
            borderRadius="xl"
            boxShadow="lg"
            justify="space-between"
            align="center"
            flexWrap="wrap"
            gap={4}
          >
            <SortingDropdown sortBy={sortBy} onSortChange={handleSortChange} />
            <Text
              fontWeight="bold"
              fontSize="lg"
              bgGradient="linear(135deg, brand.500 0%, secondary.500 100%)"
              bgClip="text"
            >
              {total} transaction{total !== 1 ? 's' : ''} found
            </Text>
          </Flex>

          <TransactionTable items={items} loading={loading} error={error} />

          {!loading && !error && items.length > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              pageSize={PAGE_SIZE}
              onPageChange={handlePageChange}
            />
          )}
        </VStack>
      </Container>
    </Box>
  );
}

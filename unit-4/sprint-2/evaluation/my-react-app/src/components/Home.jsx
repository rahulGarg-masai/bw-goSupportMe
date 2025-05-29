import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import SnackList from "./SnackList";
import SnackForm from "./SnackForm";
import "../styles/Home.css";

function Home() {
    const [snacks, setSnacks] = useState([]);
    const [filteredSnacks, setFilteredSnacks] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [editSnack, setEditSnack] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterCategory, setFilterCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const snacksPerPage = 6;

    useEffect(() => {
        fetchSnacks();
    }, []);

    useEffect(() => {
        filterAndSortSnacks();
    }, [snacks, searchTerm, filterCategory, sortBy]);

    const fetchSnacks = async () => {
        try {
            const snacksCollection = collection(db, 'snacks');
            const snacksSnapshot = await getDocs(snacksCollection);
            const snacksList = snacksSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setSnacks(snacksList);
            setFilteredSnacks(snacksList)
        } catch (error) {
            console.error("error fetching snacks", error);
        }
    };

    const filterAndSortSnacks = () => {
        let result = [...snacks];
        if (searchTerm) {
            result = result.filter(snack =>
                snack.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterCategory) {
            result = result.filter(snack => snack.category === filterCategory);
        }

        if (sortBy) {
            switch (sortBy) {
                case 'titleAsc':
                    result.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'titleDesc':
                    result.sort((a, b) => b.title.localeCompare(a.title));
                    break;
                case 'priceAsc':
                    result.sort((a, b) => a.price - b.price);
                    break;
                case 'priceDesc':
                    result.sort((a, b) => b.price - a.price);
                    break;
                case 'ratingDesc':
                    result.sort((a, b) => b.rating - a.rating);
                    break;
                default:
                    break;
            }
        }

        setFilteredSnacks(result);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };
    
    const handleFilter = (category) => {
        setFilterCategory(category);
        setCurrentPage(1);
    };
    
    const handleSort = (sortOption) => {
        setSortBy(sortOption);
        setCurrentPage(1);
    }

    const openAddForm = () => {
        setEditSnack(null);
        setShowForm(true);
    };
    
    const openEditForm = (snack) => {
        setEditSnack(snack);
        setShowForm(true);
    };
    
    const closeForm = () => {
        setShowForm(false);
    };
    
    const indexofLastSnack = currentPage * snacksPerPage;
    const indexofFirstSnack = indexofLastSnack - snacksPerPage;
    const currentSnacks = filteredSnacks.slice(indexofFirstSnack, indexofLastSnack);
    const totalPages = Math.ceil(filteredSnacks.length / snacksPerPage);
    
    return (
        <div className="home">
            <div className="controls">
                <SearchBar onSearch={handleSearch}/>
                <button className="add-button" onClick={openAddForm}>Add Snack</button>
            </div>

            <Filters 
                onFilterChange={handleFilter}
                onSortChange={handleSort}
            />

            <SnackList
                snacks={currentSnacks}
                onEdit={openEditForm}
                onDelete={fetchSnacks}
                refreshSnacks={fetchSnacks}
            />

            <div className="pagination">
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(prev => prev - 1)}
                >
                    Previous
                </button>
                <span>{currentPage} of {totalPages || 1}</span>
                <button 
                    disabled={currentPage === totalPages || totalPages === 0} 
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    Next
                </button>
            </div>

            {showForm && (
                <SnackForm 
                    snack={editSnack} 
                    onClose={closeForm} 
                    refreshSnacks={fetchSnacks} 
                />
            )}
        </div>
    );
}

export default Home;
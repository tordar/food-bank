'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DataTable } from "@/components/DataTable"
import { DataForm } from "@/components/DataForm"
import { useDataManager } from "@/hooks/useDataManager"
import {SearchBar} from "@/components/SearchBar";

interface Idea {
    _id: string;
    name: string;
    description: string;
    notes: string;
    recipe: string;
}

const ideaFields = [
    { name: 'name', label: 'Idea Name', type: 'text' as const, required: true },
    { name: 'description', label: 'Description', type: 'text' as const },
    { name: 'notes', label: 'Notes', type: 'textarea' as const },
    { name: 'recipe', label: 'Recipe', type: 'textarea' as const }
]

const ideaColumns = [
    { key: 'name', header: 'Name' },
    { key: 'description', header: 'Description' },
    { key: 'notes', header: 'Notes' },
    { key: 'recipe', header: 'Recipe' }
]

export default function IdeaTracker() {
    const {
        data: ideas,
        newItem: newIdea,
        editingItem,
        isLoading,
        isDialogOpen,
        searchTerm,
        setIsDialogOpen,
        handleInputChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        handleSearch
    } = useDataManager<Idea>('/api/ideas')

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Idea Tracker</h1>

            <SearchBar value={searchTerm} onChange={handleSearch} />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="mb-4">Add New Idea</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingItem ? 'Edit Idea' : 'Add New Idea'}</DialogTitle>
                    </DialogHeader>
                    <DataForm
                        fields={ideaFields}
                        values={editingItem || newIdea}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                        submitLabel={editingItem ? 'Update Idea' : 'Add Idea'}
                    />
                </DialogContent>
            </Dialog>

            {isLoading ? (
                <p>Loading Ideas...</p>
            ) : (
                <DataTable
                    data={ideas}
                    columns={ideaColumns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    )
}
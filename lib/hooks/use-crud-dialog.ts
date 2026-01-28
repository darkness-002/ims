"use client";

import { useState } from "react";

/**
 * Generic hook for managing CRUD dialogs
 */
export function useCrudDialog<T>() {
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleCreate = () => {
    setSelectedItem(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (item: T) => {
    setSelectedItem(item);
    setFormDialogOpen(true);
  };

  const handleDelete = (item: T) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const closeFormDialog = () => {
    setFormDialogOpen(false);
    setSelectedItem(null);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  return {
    formDialogOpen,
    setFormDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedItem,
    setSelectedItem,
    handleCreate,
    handleEdit,
    handleDelete,
    closeFormDialog,
    closeDeleteDialog,
  };
}
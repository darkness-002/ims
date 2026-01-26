"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { Institution } from "@/lib/types";

interface InstitutionsTableProps {
  institutions: Institution[];
  onEdit: (institution: Institution) => void;
  onDelete: (institution: Institution) => void;
}

export function InstitutionsTable({
  institutions,
  onEdit,
  onDelete,
}: InstitutionsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-center">Departments</TableHead>
            <TableHead className="text-center">Programs</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {institutions.map((institution) => (
            <TableRow key={institution.id}>
              <TableCell>
                <Link
                  href={`/institutions/${institution.id}`}
                  className="font-medium hover:underline"
                >
                  {institution.name}
                </Link>
              </TableCell>
              <TableCell>
                <span className="rounded bg-muted px-2 py-1 text-xs font-medium">
                  {institution.code}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {institution.email || "-"}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {institution.phone || "-"}
              </TableCell>
              <TableCell className="text-center">
                {institution.departments?.length || 0}
              </TableCell>
              <TableCell className="text-center">
                {institution.programs?.length || 0}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/institutions/${institution.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(institution)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(institution)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

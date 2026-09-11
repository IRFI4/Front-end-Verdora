import { useState } from 'react';
import LayoutPage from '@components/layout/pageLayout/LayoutPage';
import Breadcrumbs from '@components/common/Breadcrumbs';
import { SectionHeader } from '@components/common/section/AdminSectionHeader';
import { PaginationComponent } from '@components/common/pagination/Pagination';
import CatalogFilterSidebar from '@components/catalog/CatalogFilterSidebar';
import CatalogToolbar, {
  type ViewMode,
} from '@components/catalog/CatalogToolbar';
import CatalogProductList from '@components/catalog/CatalogProductList';

const Catalog = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3;

  const handleResetAll = () => {
    // Reset filters handler placeholder
  };

  return (
    <LayoutPage>
      <div className="w-full py-6 space-y-6">
        <Breadcrumbs />

        <SectionHeader
          title="All plants & garden care"
          description="22 products match your selection"
        />

        <div className="flex flex-col lg:flex-row items-start gap-7 pt-2">
          <CatalogFilterSidebar onResetAll={handleResetAll} />

          <div className="flex-1 min-w-0 w-full flex flex-col gap-6">
            <CatalogToolbar
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            <CatalogProductList viewMode={viewMode} />

            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-border">
              <span className="text-xs sm:text-sm text-text">
                Showing 1-6 of 22 products
              </span>
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={page => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default Catalog;

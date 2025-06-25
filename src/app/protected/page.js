import { Suspense } from 'react';
import ProtectedContent from './ProtectedContent';

export default function ProtectedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedContent />
    </Suspense>
  );
}
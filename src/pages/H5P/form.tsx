import { useParams, history } from 'umi';
import { EditorContextProvider } from '@escolalms/h5p-react';
import { useIntl } from 'umi';

import { H5PForm } from '@/components/H5PForm';
declare const REACT_APP_API_URL: string;

export default () => {
  const params = useParams<{ h5p?: string }>();
  const { h5p } = params;
  const intl = useIntl();
  const lang = intl.locale.split('-')[0];
  return (
    <EditorContextProvider
      defaultLang={lang}
      url={`${window.REACT_APP_API_URL || REACT_APP_API_URL}/api/admin/hh5p`}
    >
      <H5PForm
        onSubmit={(id) => h5p === 'new' && history.push(`/h5ps/${id}`)}
        id={h5p === 'new' ? undefined : h5p}
      />
    </EditorContextProvider>
  );
};

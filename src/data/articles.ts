/* ------------------------------------------------------------------ */
/*  Article content data — drives every /article/:slug page            */
/* ------------------------------------------------------------------ */

export interface FormulaSection {
  type: 'formula'
  math: string
  label?: string
  labelRu?: string
}

export interface TextSection {
  type: 'text'
  html: string // supports <strong>, <em>, <InfoTooltip />
  htmlRu?: string
}

export interface ChartSection {
  type: 'chart'
  chart: 'beeswarm' | 'bar' | 'line' | 'roc' | 'scatter' | 'area' | 'sigmoid' | 'tree' | 'forest' | 'heatmap' | 'architecture'
  title: string
  titleRu?: string
  description: string
  descriptionRu?: string
  interactive?: boolean
}

export interface TabSection {
  type: 'tabs'
  tabs: { label: string; content: ContentBlock[] }[]
}

export interface DefinitionBox {
  type: 'definition'
  title: string
  titleRu?: string
  math: string
  note?: string
  noteRu?: string
}

export interface InfoBox {
  type: 'info'
  variant: 'accent' | 'emerald' | 'amber'
  text: string
  textRu?: string
}

export type ContentBlock =
  | TextSection
  | FormulaSection
  | ChartSection
  | TabSection
  | DefinitionBox
  | InfoBox

export interface ArticleChapter {
  slug: string
  title: string
  titleRu: string
  subtitle: string
  subtitleRu: string
  authors: string
  date: string
  thumbnail: string
  sections: { heading: string; headingRu: string; blocks: ContentBlock[] }[]
  conclusion: string
  conclusionRu: string
  references: { title: string; authors: string; url: string }[]
}

/* ================================================================== */
/*  CHAPTERS                                                           */
/* ================================================================== */

const BASE = 'https://mlu-explain.github.io/assets/thumbnails'

export const chapters: ArticleChapter[] = [
  /* ---- 1. Neural Networks ---- */
  {
    slug: 'neural-networks',
    title: 'Neural Networks',
    titleRu: 'Нейронные сети',
    subtitle: 'The Building Blocks of Deep Learning',
    subtitleRu: 'Строительные блоки глубокого обучения',
    authors: 'Jared Wilber',
    date: 'March 2024',
    thumbnail: `${BASE}/thumbnail-neural-networks.jpg`,
    sections: [
      {
        heading: 'What is a Neural Network?',
        headingRu: 'Что такое нейронная сеть?',
        blocks: [
          { type: 'text', html: 'Neural networks are computational models inspired by the biological neural networks in the human brain. They consist of layers of interconnected nodes (<strong>neurons</strong>) that process information using connectionist approaches to computation.', htmlRu: 'Нейронные сети — это вычислительные модели, вдохновлённые биологическими нейронными сетями человеческого мозга. Они состоят из слоёв взаимосвязанных узлов (<strong>нейронов</strong>), которые обрабатывают информацию с использованием коннекционистских подходов к вычислениям.' },
          { type: 'text', html: 'Each connection (synapse) between neurons has a <strong>weight</strong> that is adjusted during learning. A neuron computes a weighted sum of its inputs, adds a bias, and passes the result through an <strong>activation function</strong>.', htmlRu: 'Каждое соединение (синапс) между нейронами имеет <strong>вес</strong>, который корректируется в процессе обучения. Нейрон вычисляет взвешенную сумму своих входов, добавляет смещение и пропускает результат через <strong>функцию активации</strong>.' },
          { type: 'formula', math: 'a = \\sigma\\!\\left(\\sum_{i=1}^{n} w_i x_i + b\\right)', label: 'Neuron output', labelRu: 'Выход нейрона' },
          { type: 'definition', title: 'Activation Function', titleRu: 'Функция активации', math: '\\sigma(z) = \\frac{1}{1 + e^{-z}}', note: 'The sigmoid function maps any input to a value between 0 and 1, introducing non-linearity.', noteRu: 'Сигмоидная функция отображает любой вход в значение от 0 до 1, вводя нелинейность.' },
        ],
      },
      {
        heading: 'Network Architecture',
        headingRu: 'Архитектура сети',
        blocks: [
          { type: 'text', html: 'A typical neural network consists of an <strong>input layer</strong>, one or more <strong>hidden layers</strong>, and an <strong>output layer</strong>. The depth (number of hidden layers) gives rise to the term "deep learning".', htmlRu: 'Типичная нейронная сеть состоит из <strong>входного слоя</strong>, одного или нескольких <strong>скрытых слоёв</strong> и <strong>выходного слоя</strong>. Глубина (количество скрытых слоёв) даёт название термину «глубокое обучение».' },
          { type: 'chart', chart: 'area', title: 'Layer Activations During Forward Pass', titleRu: 'Активации слоёв при прямом проходе', description: 'Visualizing how activations flow through the network layers', descriptionRu: 'Визуализация потока активаций через слои сети', interactive: true },
          { type: 'text', html: 'The network learns by adjusting weights to minimize a <strong>loss function</strong>. This process is called <strong>backpropagation</strong>, which uses the chain rule of calculus to compute gradients.', htmlRu: 'Сеть обучается, корректируя веса для минимизации <strong>функции потерь</strong>. Этот процесс называется <strong>обратным распространением ошибки</strong> (backpropagation) и использует цепное правило для вычисления градиентов.' },
          { type: 'formula', math: '\\frac{\\partial L}{\\partial w_{ij}} = \\frac{\\partial L}{\\partial a_j} \\cdot \\frac{\\partial a_j}{\\partial z_j} \\cdot \\frac{\\partial z_j}{\\partial w_{ij}}', label: 'Backpropagation chain rule', labelRu: 'Цепное правило обратного распространения' },
        ],
      },
      {
        heading: 'Training with Gradient Descent',
        headingRu: 'Обучение градиентным спуском',
        blocks: [
          { type: 'text', html: 'Gradient descent is the optimization algorithm used to update weights. It iteratively moves toward the minimum of the loss function.', htmlRu: 'Градиентный спуск — это алгоритм оптимизации, используемый для обновления весов. Он итеративно движется к минимуму функции потерь.' },
          { type: 'chart', chart: 'scatter', title: 'Loss Landscape & Optimization Path', titleRu: 'Ландшафт потерь и путь оптимизации', description: 'Watch gradient descent navigate the loss surface', descriptionRu: 'Наблюдайте, как градиентный спуск перемещается по поверхности потерь', interactive: true },
          { type: 'formula', math: 'w_{t+1} = w_t - \\eta \\nabla L(w_t)', label: 'Weight update rule', labelRu: 'Правило обновления весов' },
          { type: 'info', variant: 'accent', text: 'Choosing the right learning rate η is crucial — too large causes divergence, too small causes slow convergence.', textRu: 'Выбор правильного темпа обучения η критичен — слишком большой вызывает расходимость, слишком малый — медленную сходимость.' },
          { type: 'text', html: '<strong>Adam optimizer</strong> combines the benefits of momentum and RMSProp, maintaining per-parameter adaptive learning rates. It is the default optimizer for most deep learning tasks.', htmlRu: '<strong>Оптимизатор Adam</strong> объединяет преимущества момента и RMSProp, поддерживая адаптивные темпы обучения для каждого параметра. Это оптимизатор по умолчанию для большинства задач глубокого обучения.' },
          { type: 'formula', math: 'm_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t, \\quad v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2', label: 'Adam: momentum + adaptive LR', labelRu: 'Adam: момент + адаптивный LR' },
        ],
      },
    ],
    conclusion: 'Neural networks are the backbone of modern AI. From ChatGPT to Stable Diffusion, understanding their architecture and training process is essential for anyone working in machine learning today.',
    conclusionRu: 'Нейронные сети — основа современного ИИ. От ChatGPT до Stable Diffusion — понимание их архитектуры и процесса обучения необходимо каждому, кто работает в машинном обучении.',
    references: [
      { title: 'Deep Learning', authors: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville', url: 'https://www.deeplearningbook.org/' },
      { title: 'Neural Networks and Deep Learning', authors: 'Michael Nielsen', url: 'http://neuralnetworksanddeeplearning.com/' },
    ],
  },

  /* ---- 2. Equality of Odds ---- */
  {
    slug: 'equality-of-odds',
    title: 'Equality Of Odds',
    titleRu: 'Равенство шансов',
    subtitle: 'A Visual Introduction to Measuring and Mitigating Bias in Machine Learning',
    subtitleRu: 'Визуальное введение в измерение и устранение смещений в машинном обучении',
    authors: 'Mia Mayer & Jared Wilber',
    date: 'April 2023',
    thumbnail: `${BASE}/thumbnail-equality-of-odds.jpg`,
    sections: [
      {
        heading: 'Defining Equalized Odds',
        headingRu: 'Определение равных шансов',
        blocks: [
          { type: 'text', html: 'The <em>Equalized Odds</em> (EO) fairness criterion aims to equalize the errors a model makes for different groups. EO considers the ground truth distribution of labels.', htmlRu: 'Критерий справедливости <em>равных шансов</em> (EO) направлен на уравнивание ошибок модели для различных групп. EO учитывает истинное распределение меток.' },
          { type: 'text', html: 'In a hiring scenario, a model could make a <strong>wrong rejection</strong> (rejecting a qualified candidate) or a <strong>wrong acceptance</strong> (accepting an unqualified candidate).', htmlRu: 'В сценарии найма модель может совершить <strong>ложный отказ</strong> (отклонить квалифицированного кандидата) или <strong>ложное принятие</strong> (принять неквалифицированного кандидата).' },
          { type: 'formula', math: 'P(\\hat{Y}=1 \\mid Y=y,\\; A=\\blacksquare) = P(\\hat{Y}=1 \\mid Y=y,\\; A=\\square), \\quad y \\in \\{0,1\\}', label: 'EO Definition', labelRu: 'Определение EO' },
          { type: 'definition', title: 'False Positive Rate Balance', titleRu: 'Баланс ложноположительных', math: '\\text{FPR}_{\\blacksquare} - \\text{FPR}_{\\square}', note: 'Range [-1, 1]. Closer to 0 means more fair.', noteRu: 'Диапазон [-1, 1]. Ближе к 0 означает более справедливый.' },
        ],
      },
      {
        heading: 'Measuring Fairness',
        headingRu: 'Измерение справедливости',
        blocks: [
          { type: 'text', html: 'We compare error rates across groups. The key metrics are <strong>FPR</strong> (false positive rate) and <strong>FNR</strong> (false negative rate).', htmlRu: 'Мы сравниваем частоту ошибок по группам. Ключевые метрики — <strong>FPR</strong> (частота ложноположительных) и <strong>FNR</strong> (частота ложноотрицательных).' },
          { type: 'chart', chart: 'beeswarm', title: 'Interactive: Beeswarm Predictions', titleRu: 'Интерактив: Beeswarm-предсказания', description: 'Drag the threshold to change the probability cutoff', descriptionRu: 'Перетаскивайте порог для изменения границы вероятности', interactive: true },
          { type: 'chart', chart: 'bar', title: 'Outcomes by Group', titleRu: 'Результаты по группам', description: 'Count of TP, TN, FP, FN per group', descriptionRu: 'Подсчёт TP, TN, FP, FN для каждой группы' },
          { type: 'chart', chart: 'line', title: 'FPR/FNR by Threshold', titleRu: 'FPR/FNR по порогу', description: 'Comparing error rates across all thresholds', descriptionRu: 'Сравнение частот ошибок на всех порогах' },
        ],
      },
      {
        heading: 'Achieving Fairness',
        headingRu: 'Достижение справедливости',
        blocks: [
          { type: 'text', html: 'We can achieve EO through <strong>constrained optimization during training</strong> or via <strong>post-processing</strong>.', htmlRu: 'Достичь EO можно через <strong>оптимизацию с ограничениями при обучении</strong> или с помощью <strong>постобработки</strong>.' },
          { type: 'formula', math: '\\min_\\theta L(\\theta) \\quad \\text{s.t.} \\quad |P(\\hat{Y}\\neq Y, A{=}\\blacksquare) - P(\\hat{Y}\\neq Y, A{=}\\square)| \\leq \\varepsilon', label: 'Constrained optimization', labelRu: 'Оптимизация с ограничениями' },
          { type: 'chart', chart: 'roc', title: 'ROC Curves per Group', titleRu: 'ROC-кривые по группам', description: 'Where TPR and FPR match, EO is satisfied', descriptionRu: 'Где TPR и FPR совпадают — EO выполнено', interactive: true },
          { type: 'info', variant: 'emerald', text: 'When TPR and FPR match for both groups (neither are 0), Equalized Odds is satisfied.', textRu: 'Когда TPR и FPR совпадают для обеих групп (ни один не равен 0), равные шансы выполнены.' },
        ],
      },
    ],
    conclusion: 'Equality of Odds offers a principled approach to measuring and mitigating bias. Before using EO, carefully consider the context and potential trade-offs between competing objectives.',
    conclusionRu: 'Равенство шансов предлагает принципиальный подход к измерению и устранению смещений. Перед использованием EO тщательно учитывайте контекст и возможные компромиссы между конкурирующими целями.',
    references: [
      { title: 'Fairness and Machine Learning', authors: 'Barocas, Hardt, Narayanan', url: 'https://fairmlbook.org/' },
      { title: 'Equality of Opportunity in Supervised Learning', authors: 'Hardt, Price, Srebro, 2016', url: 'https://arxiv.org/abs/1610.02413' },
    ],
  },

  /* ---- 3. Logistic Regression ---- */
  {
    slug: 'logistic-regression',
    title: 'Logistic Regression',
    titleRu: 'Логистическая регрессия',
    subtitle: 'Binary Classification Through the Sigmoid Function',
    subtitleRu: 'Бинарная классификация через сигмоидную функцию',
    authors: 'Jared Wilber',
    date: 'February 2024',
    thumbnail: `${BASE}/thumbnail-logistic-regression.jpg`,
    sections: [
      {
        heading: 'The Sigmoid Function',
        headingRu: 'Сигмоидная функция',
        blocks: [
          { type: 'text', html: 'Logistic regression models the probability that an input belongs to a particular class using the <strong>sigmoid (logistic) function</strong>.', htmlRu: 'Логистическая регрессия моделирует вероятность принадлежности входа к определённому классу с помощью <strong>сигмоидной (логистической) функции</strong>.' },
          { type: 'formula', math: 'P(y=1 \\mid x) = \\frac{1}{1 + e^{-(w^Tx + b)}}', label: 'Sigmoid output', labelRu: 'Выход сигмоиды' },
          { type: 'chart', chart: 'sigmoid', title: 'Sigmoid Curve & Decision Boundary', titleRu: 'Сигмоидная кривая и граница решения', description: 'The S-shaped curve maps any input to a probability between 0 and 1', descriptionRu: 'S-образная кривая отображает любой вход в вероятность от 0 до 1', interactive: true },
          { type: 'text', html: 'The model learns the optimal weights <strong>w</strong> and bias <strong>b</strong> to separate classes.', htmlRu: 'Модель обучается оптимальным весам <strong>w</strong> и смещению <strong>b</strong> для разделения классов.' },
        ],
      },
      {
        heading: 'Log-Loss and Maximum Likelihood',
        headingRu: 'Лог-потеря и метод максимального правдоподобия',
        blocks: [
          { type: 'text', html: 'Unlike linear regression, logistic regression uses <strong>log-loss</strong> (cross-entropy) as its cost function, derived from maximum likelihood estimation.', htmlRu: 'В отличие от линейной регрессии, логистическая регрессия использует <strong>лог-потерю</strong> (кросс-энтропию) как функцию стоимости, выведенную из метода максимального правдоподобия.' },
          { type: 'formula', math: 'L(\\theta) = -\\frac{1}{m}\\sum_{i=1}^{m}[y_i\\log(h_\\theta(x_i)) + (1-y_i)\\log(1-h_\\theta(x_i))]', label: 'Cross-entropy loss', labelRu: 'Кросс-энтропийная потеря' },
          { type: 'chart', chart: 'area', title: 'Loss Surface During Training', titleRu: 'Поверхность потерь при обучении', description: 'How the loss decreases as the model learns', descriptionRu: 'Как уменьшается потеря по мере обучения модели', interactive: true },
          { type: 'text', html: 'The <strong>decision boundary</strong> of logistic regression is a linear hyperplane in the feature space. For non-linear boundaries, you must add polynomial features or use kernel methods.', htmlRu: '<strong>Граница решения</strong> логистической регрессии — линейная гиперплоскость в пространстве признаков. Для нелинейных границ необходимо добавить полиномиальные признаки или использовать ядерные методы.' },
        ],
      },
      {
        heading: 'Regularization and Multiclass',
        headingRu: 'Регуляризация и мультиклассовая классификация',
        blocks: [
          { type: 'text', html: 'To prevent overfitting, logistic regression commonly uses <strong>L2 regularization</strong> (C parameter in scikit-learn). For multiclass problems, <strong>One-vs-Rest</strong> or <strong>Softmax (multinomial)</strong> logistic regression extends the binary model.', htmlRu: 'Для предотвращения переобучения логистическая регрессия обычно использует <strong>L2-регуляризацию</strong> (параметр C в scikit-learn). Для мультиклассовых задач <strong>Один-против-всех</strong> или <strong>Softmax (мультиномиальная)</strong> логистическая регрессия расширяет бинарную модель.' },
          { type: 'formula', math: 'L_{reg}(\\theta) = L(\\theta) + \\frac{\\lambda}{2m}\\|\\theta\\|^2', label: 'Regularized logistic regression', labelRu: 'Регуляризованная логистическая регрессия' },
          { type: 'formula', math: 'P(y=k|x) = \\frac{e^{w_k^Tx + b_k}}{\\sum_{j=1}^{K} e^{w_j^Tx + b_j}}', label: 'Softmax (multiclass)', labelRu: 'Softmax (мультиклассовый)' },
          { type: 'info', variant: 'emerald', text: 'Logistic regression is often the best first model to try on a classification problem. Its coefficients are directly interpretable as log-odds ratios.', textRu: 'Логистическая регрессия часто является лучшей первой моделью для задачи классификации. Её коэффициенты напрямую интерпретируются как логарифмы отношений шансов.' },
        ],
      },
      {
        heading: 'Linear Models in Practice (Yandex ML Handbook)',
        headingRu: 'Линейные модели на практике (Хендбук Яндекса по ML)',
        blocks: [
          { type: 'text', html: 'Logistic regression belongs to the family of <strong>linear models</strong>, where the predicted value is computed as a weighted sum of input features. Despite the name, logistic regression solves <strong>classification</strong> tasks by modeling the probability that an object belongs to a given class.', htmlRu: 'Логистическая регрессия принадлежит к семейству <strong>линейных моделей</strong>, где предсказанное значение вычисляется как взвешенная сумма входных признаков. Несмотря на название, логистическая регрессия решает задачи <strong>классификации</strong>, моделируя вероятность принадлежности объекта к данному классу.' },
          { type: 'text', html: 'In supervised learning, every object in the training set has a known target value. The main goal is to train an algorithm that can <strong>predict the target variable</strong> for new, unseen objects. Linear models are among the most fundamental approaches, offering interpretability and computational efficiency.', htmlRu: 'В обучении с учителем каждому объекту из обучающей выборки соответствует известное целевое значение. Главная цель — обучить алгоритм, способный <strong>предсказывать целевую переменную</strong> для новых, ранее не виденных объектов. Линейные модели — одни из самых фундаментальных подходов, обеспечивающие интерпретируемость и вычислительную эффективность.' },
          { type: 'info', variant: 'accent', text: 'Linear models form the basis of both classification and regression. The key difference: linear regression predicts a continuous value, while logistic regression applies a sigmoid to predict class probabilities.', textRu: 'Линейные модели лежат в основе как классификации, так и регрессии. Ключевое различие: линейная регрессия предсказывает непрерывное значение, а логистическая регрессия применяет сигмоиду для предсказания вероятностей классов.' },
        ],
      },
    ],
    conclusion: 'Logistic regression remains one of the most widely used classification algorithms. Its simplicity, interpretability, and probabilistic output make it an excellent baseline model.',
    conclusionRu: 'Логистическая регрессия остаётся одним из самых популярных алгоритмов классификации. Её простота, интерпретируемость и вероятностный вывод делают её отличной базовой моделью.',
    references: [
      { title: 'Pattern Recognition and Machine Learning', authors: 'Christopher Bishop', url: 'https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/' },
      { title: 'Введение в ML — Классическое обучение с учителем (Хендбук Яндекса)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/vvedenie-glava-dva' },
    ],
  },

  /* ---- 4. Linear Regression ---- */
  {
    slug: 'linear-regression',
    title: 'Linear Regression',
    titleRu: 'Линейная регрессия',
    subtitle: 'Fitting Lines to Data with Least Squares',
    subtitleRu: 'Аппроксимация данных методом наименьших квадратов',
    authors: 'Jared Wilber',
    date: 'January 2024',
    thumbnail: `${BASE}/thumbnail-linear-regression.jpg`,
    sections: [
      {
        heading: 'The Linear Model',
        headingRu: 'Линейная модель',
        blocks: [
          { type: 'text', html: 'Linear regression models the relationship between a dependent variable and one or more independent variables using a <strong>linear equation</strong>.', htmlRu: 'Линейная регрессия моделирует связь между зависимой переменной и одним или несколькими независимыми переменными с помощью <strong>линейного уравнения</strong>.' },
          { type: 'formula', math: '\\hat{y} = w_1x_1 + w_2x_2 + \\ldots + w_nx_n + b', label: 'Linear prediction', labelRu: 'Линейное предсказание' },
          { type: 'chart', chart: 'scatter', title: 'Best-Fit Line with Confidence Intervals', titleRu: 'Линия наилучшего приближения с доверительными интервалами', description: 'The regression line minimizes the sum of squared residuals', descriptionRu: 'Линия регрессии минимизирует сумму квадратов остатков', interactive: true },
        ],
      },
      {
        heading: 'Ordinary Least Squares',
        headingRu: 'Метод наименьших квадратов',
        blocks: [
          { type: 'text', html: 'The <strong>OLS method</strong> finds the parameters that minimize the sum of squared differences between observed and predicted values.', htmlRu: '<strong>Метод наименьших квадратов (МНК)</strong> находит параметры, минимизирующие сумму квадратов разностей между наблюдаемыми и предсказанными значениями.' },
          { type: 'formula', math: '\\hat{w} = (X^TX)^{-1}X^Ty', label: 'OLS closed-form solution', labelRu: 'Замкнутое решение МНК' },
          { type: 'definition', title: 'R-squared', titleRu: 'Коэффициент детерминации R²', math: 'R^2 = 1 - \\frac{\\sum(y_i - \\hat{y}_i)^2}{\\sum(y_i - \\bar{y})^2}', note: 'Measures the proportion of variance explained by the model. Range: [0, 1].', noteRu: 'Измеряет долю дисперсии, объяснённую моделью. Диапазон: [0, 1].' },
          { type: 'text', html: 'OLS assumes: <strong>linearity</strong>, <strong>independence</strong> of errors, <strong>homoscedasticity</strong> (constant variance), and <strong>no multicollinearity</strong>. Violations of these assumptions require alternative methods like Ridge/Lasso regression.', htmlRu: 'МНК предполагает: <strong>линейность</strong>, <strong>независимость</strong> ошибок, <strong>гомоскедастичность</strong> (постоянная дисперсия) и <strong>отсутствие мультиколлинеарности</strong>. Нарушение этих допущений требует альтернативных методов — Ridge/Lasso-регрессии.' },
          { type: 'info', variant: 'emerald', text: 'Regularized variants: <strong>Ridge</strong> (L2) shrinks coefficients toward zero. <strong>Lasso</strong> (L1) performs feature selection by driving some coefficients exactly to zero. <strong>Elastic Net</strong> combines both.', textRu: 'Регуляризованные варианты: <strong>Ridge</strong> (L2) сжимает коэффициенты к нулю. <strong>Lasso</strong> (L1) выполняет отбор признаков, обнуляя некоторые коэффициенты. <strong>Elastic Net</strong> объединяет оба подхода.' },
        ],
      },
      {
        heading: 'Linear Regression & Supervised Learning (Yandex ML Handbook)',
        headingRu: 'Линейная регрессия и обучение с учителем (Хендбук Яндекса по ML)',
        blocks: [
          { type: 'text', html: 'Linear regression is a core <strong>supervised learning</strong> method where the target variable is a continuous real number. The model finds a linear combination of features that best approximates the observed target values using the <strong>least squares</strong> principle.', htmlRu: 'Линейная регрессия — основной метод <strong>обучения с учителем</strong>, где целевая переменная является непрерывным действительным числом. Модель находит линейную комбинацию признаков, наилучшим образом аппроксимирующую наблюдаемые целевые значения по принципу <strong>наименьших квадратов</strong>.' },
          { type: 'text', html: 'In the broader context of supervised learning, both classification and regression tasks share the same setup: given labeled training data, the algorithm learns a mapping from inputs to outputs. The difference lies in the nature of the target — <strong>discrete classes</strong> for classification, <strong>continuous values</strong> for regression.', htmlRu: 'В более широком контексте обучения с учителем задачи классификации и регрессии имеют одинаковую постановку: по размеченным обучающим данным алгоритм обучает отображение из входов в выходы. Разница в природе целевой переменной — <strong>дискретные классы</strong> для классификации, <strong>непрерывные значения</strong> для регрессии.' },
          { type: 'info', variant: 'accent', text: 'Linear models are interpretable: each weight shows how much the corresponding feature influences the prediction. This makes them valuable not only for prediction but also for understanding data relationships.', textRu: 'Линейные модели интерпретируемы: каждый вес показывает, насколько соответствующий признак влияет на предсказание. Это делает их ценными не только для предсказания, но и для понимания взаимосвязей в данных.' },
        ],
      },
      {
        heading: 'Polynomial Regression & Diagnostics',
        headingRu: 'Полиномиальная регрессия и диагностика',
        blocks: [
          { type: 'text', html: '<strong>Polynomial regression</strong> extends linear regression by adding polynomial features (x², x³, interactions). The model remains linear in parameters but can fit nonlinear relationships. The bias-variance tradeoff becomes crucial as polynomial degree increases.', htmlRu: '<strong>Полиномиальная регрессия</strong> расширяет линейную, добавляя полиномиальные признаки (x², x³, взаимодействия). Модель остаётся линейной по параметрам, но может аппроксимировать нелинейные зависимости. Компромисс смещения-дисперсии становится критичным при росте степени полинома.' },
          { type: 'text', html: '<strong>Diagnostic tests</strong>: residual plots (should show no pattern), Cook\'s distance (detects influential points), VIF (Variance Inflation Factor, detects multicollinearity). <strong>Heteroscedasticity</strong> (non-constant variance) requires robust standard errors or weighted least squares.', htmlRu: '<strong>Диагностические тесты</strong>: графики остатков (не должны показывать паттерна), расстояние Кука (обнаруживает влиятельные точки), VIF (фактор инфляции дисперсии, обнаруживает мультиколлинеарность). <strong>Гетероскедастичность</strong> (непостоянная дисперсия) требует робастных стандартных ошибок или взвешенного МНК.' },
          { type: 'formula', math: '\text{VIF}_j = \frac{1}{1 - R_j^2}, \quad \text{VIF} > 10 \Rightarrow \text{multicollinearity}', label: 'Variance Inflation Factor', labelRu: 'Фактор инфляции дисперсии' },
          { type: 'info', variant: 'emerald', text: 'Bayesian linear regression provides uncertainty estimates: instead of point estimates, it gives a posterior distribution over weights. This is useful for active learning and decision-making under uncertainty.', textRu: 'Байесовская линейная регрессия даёт оценки неопределённости: вместо точечных оценок она выдаёт апостериорное распределение весов. Это полезно для активного обучения и принятия решений в условиях неопределённости.' },
        ],
      },
    ],
    conclusion: 'Linear regression is the foundation upon which many advanced ML techniques are built. Understanding its assumptions, diagnostic tests, and regularized variants (Ridge, Lasso, Bayesian) is key to proper application and model interpretation.',
    conclusionRu: 'Линейная регрессия — фундамент многих продвинутых методов МО. Понимание её допущений и ограничений — ключ к правильному применению.',
    references: [
      { title: 'An Introduction to Statistical Learning', authors: 'James, Witten, Hastie, Tibshirani', url: 'https://www.statlearning.com/' },
      { title: 'Введение в ML — Классическое обучение с учителем (Хендбук Яндекса)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/vvedenie-glava-dva' },
    ],
  },

  /* ---- 5. Reinforcement Learning ---- */
  {
    slug: 'reinforcement-learning',
    title: 'Reinforcement Learning',
    titleRu: 'Обучение с подкреплением',
    subtitle: 'Learning Through Trial and Error in Interactive Environments',
    subtitleRu: 'Обучение методом проб и ошибок в интерактивных средах',
    authors: 'Jared Wilber',
    date: 'May 2023',
    thumbnail: `${BASE}/thumbnail-reinforcement-learning.jpg`,
    sections: [
      {
        heading: 'The RL Framework',
        headingRu: 'Фреймворк обучения с подкреплением',
        blocks: [
          { type: 'text', html: 'In reinforcement learning, an <strong>agent</strong> learns to make decisions by interacting with an <strong>environment</strong>. The agent receives <strong>rewards</strong> or <strong>penalties</strong> based on its actions.', htmlRu: 'В обучении с подкреплением <strong>агент</strong> учится принимать решения, взаимодействуя со <strong>средой</strong>. Агент получает <strong>награды</strong> или <strong>штрафы</strong> в зависимости от своих действий.' },
          { type: 'formula', math: 'G_t = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1}', label: 'Discounted return', labelRu: 'Дисконтированная награда' },
          { type: 'text', html: 'The <strong>exploration-exploitation dilemma</strong> is central to RL: should the agent exploit known good actions or explore potentially better ones?', htmlRu: '<strong>Дилемма исследования и эксплуатации</strong> — центральная проблема RL: агенту использовать известные хорошие действия или исследовать потенциально лучшие?' },
          { type: 'chart', chart: 'area', title: 'Grid World: Agent Learning Path', titleRu: 'Сеточный мир: путь обучения агента', description: 'Watch the agent learn optimal policies through interaction', descriptionRu: 'Наблюдайте, как агент обучает оптимальные стратегии через взаимодействие', interactive: true },
        ],
      },
      {
        heading: 'Q-Learning',
        headingRu: 'Q-обучение',
        blocks: [
          { type: 'text', html: 'Q-learning is a model-free algorithm that learns the value of taking an action in a given state.', htmlRu: 'Q-обучение — это безмодельный алгоритм, который обучает значение выполнения действия в данном состоянии.' },
          { type: 'formula', math: 'Q(s,a) \\leftarrow Q(s,a) + \\alpha[r + \\gamma \\max_{a\'} Q(s\',a\') - Q(s,a)]', label: 'Q-learning update rule', labelRu: 'Правило обновления Q-обучения' },
          { type: 'chart', chart: 'line', title: 'Q-Value Convergence Over Episodes', titleRu: 'Сходимость Q-значений по эпизодам', description: 'How Q-values stabilize as the agent learns', descriptionRu: 'Как Q-значения стабилизируются по мере обучения агента', interactive: true },
          { type: 'text', html: 'Modern RL often uses <strong>Deep Q-Networks (DQN)</strong>, where a neural network approximates the Q-function. Experience replay and target networks stabilize training.', htmlRu: 'Современное RL часто использует <strong>глубокие Q-сети (DQN)</strong>, где нейронная сеть аппроксимирует Q-функцию. Повторение опыта и целевые сети стабилизируют обучение.' },
          { type: 'info', variant: 'emerald', text: 'Policy gradient methods (REINFORCE, PPO, A3C) directly optimize the policy without learning a value function, making them suitable for continuous action spaces.', textRu: 'Методы градиента политики (REINFORCE, PPO, A3C) напрямую оптимизируют политику без обучения функции значения, что делает их подходящими для непрерывных пространств действий.' },
        ],
      },
      {
        heading: 'Modern RL: From Games to LLMs',
        headingRu: 'Современное RL: от игр к LLM',
        blocks: [
          { type: 'text', html: '<strong>RLHF</strong> (Reinforcement Learning from Human Feedback) has become essential for aligning large language models. A reward model trained on human preferences guides PPO to optimize the LLM\'s outputs — this is how ChatGPT, Claude, and Gemini learn to be helpful and harmless.', htmlRu: '<strong>RLHF</strong> (обучение с подкреплением по обратной связи от людей) стало ключевым для выравнивания больших языковых моделей. Модель награды, обученная на человеческих предпочтениях, направляет PPO для оптимизации выходов LLM — так ChatGPT, Claude и Gemini учатся быть полезными и безопасными.' },
          { type: 'formula', math: 'R(\theta) = \mathbb{E}_{x \sim D, y \sim \pi_\theta}[r(x,y)] - \beta \cdot D_{KL}(\pi_\theta \| \pi_{ref})', label: 'RLHF objective with KL penalty', labelRu: 'Целевая функция RLHF с KL-штрафом' },
          { type: 'text', html: '<strong>AlphaGo</strong> combined Monte Carlo Tree Search with deep RL to defeat the world Go champion. <strong>Multi-agent RL</strong> (MARL) extends RL to settings with multiple agents — relevant for autonomous driving, market making, and game AI. <strong>Offline RL</strong> learns from fixed datasets without environment interaction.', htmlRu: '<strong>AlphaGo</strong> объединил MCTS с глубоким RL для победы над чемпионом мира по го. <strong>Мультиагентное RL</strong> (MARL) расширяет RL на настройки с несколькими агентами — актуально для беспилотных автомобилей, маркет-мейкинга и игрового ИИ. <strong>Офлайн RL</strong> обучается на фиксированных данных без взаимодействия со средой.' },
          { type: 'info', variant: 'amber', text: 'Sample efficiency remains RL\'s biggest challenge: real-world applications (robotics, healthcare) cannot afford millions of environment interactions. Model-based RL (Dreamer, World Models) learns a world simulator to dramatically reduce sample complexity.', textRu: 'Эффективность использования данных остаётся главным вызовом RL: реальные применения (робототехника, здравоохранение) не могут позволить миллионы взаимодействий со средой. Модельное RL (Dreamer, World Models) обучает симулятор мира для значительного снижения сложности выборки.' },
        ],
      },
    ],
    conclusion: 'Reinforcement learning powers some of AI\'s most impressive achievements, from game-playing to robotics. RLHF has become the standard for aligning LLMs, making RL essential for modern AI. Understanding the exploration-exploitation tradeoff is key to building effective RL agents.',
    conclusionRu: 'Обучение с подкреплением обеспечивает одни из самых впечатляющих достижений ИИ — от игр до робототехники. RLHF стал стандартом выравнивания LLM, делая RL необходимым для современного ИИ. Понимание компромисса «исследование vs. эксплуатация» — ключ к созданию эффективных RL-агентов.',
    references: [
      { title: 'Reinforcement Learning: An Introduction', authors: 'Richard Sutton & Andrew Barto', url: 'http://incompleteideas.net/book/the-book-2nd.html' },
    ],
  },

  /* ---- 6. ROC & AUC ---- */
  {
    slug: 'roc-auc',
    title: 'ROC & AUC',
    titleRu: 'ROC-кривая и AUC',
    subtitle: 'Visualizing Classifier Performance Across All Thresholds',
    subtitleRu: 'Визуализация качества классификатора на всех порогах',
    authors: 'Jared Wilber',
    date: 'June 2023',
    thumbnail: `${BASE}/thumbnail-roc-auc.jpg`,
    sections: [
      {
        heading: 'The ROC Curve',
        headingRu: 'ROC-кривая',
        blocks: [
          { type: 'text', html: 'The <strong>Receiver Operating Characteristic</strong> (ROC) curve plots the True Positive Rate against the False Positive Rate at various classification thresholds.', htmlRu: '<strong>ROC-кривая</strong> (Receiver Operating Characteristic) отображает зависимость истинно положительной частоты от ложноположительной на различных порогах классификации.' },
          { type: 'chart', chart: 'roc', title: 'Comparing ROC Curves', titleRu: 'Сравнение ROC-кривых', description: 'Perfect vs. Our vs. Random classifier', descriptionRu: 'Идеальный vs. наш vs. случайный классификатор', interactive: true },
          { type: 'definition', title: 'Area Under the Curve (AUC)', titleRu: 'Площадь под кривой (AUC)', math: '\\text{AUC} = \\int_0^1 \\text{TPR}(\\text{FPR})\\, d(\\text{FPR})', note: 'AUC = 1 means perfect classification. AUC = 0.5 means random guessing.', noteRu: 'AUC = 1 означает идеальную классификацию. AUC = 0.5 — случайное угадывание.' },
        ],
      },
      {
        heading: 'Interpreting AUC',
        headingRu: 'Интерпретация AUC',
        blocks: [
          { type: 'text', html: 'AUC represents the probability that a randomly chosen positive example is ranked higher than a randomly chosen negative example.', htmlRu: 'AUC представляет вероятность того, что случайно выбранный положительный пример ранжирован выше случайно выбранного отрицательного.' },
          { type: 'chart', chart: 'area', title: 'AUC Under Varying Class Distributions', titleRu: 'AUC при различных распределениях классов', description: 'How class imbalance affects the ROC curve', descriptionRu: 'Как дисбаланс классов влияет на ROC-кривую', interactive: true },
          { type: 'text', html: 'An AUC of <strong>0.9+</strong> is excellent, <strong>0.8-0.9</strong> is good, <strong>0.7-0.8</strong> is fair, and <strong>0.5</strong> is no better than random guessing. However, AUC alone can be misleading for imbalanced datasets — consider PR curves instead.', htmlRu: 'AUC <strong>0.9+</strong> — отлично, <strong>0.8–0.9</strong> — хорошо, <strong>0.7–0.8</strong> — удовлетворительно, <strong>0.5</strong> — не лучше случайного угадывания. Однако AUC может вводить в заблуждение при несбалансированных данных — используйте PR-кривые.' },
          { type: 'info', variant: 'emerald', text: 'When comparing two classifiers, prefer the one with higher AUC. But remember: AUC measures ranking quality, not calibration. A model can have perfect AUC but poorly calibrated probabilities.', textRu: 'При сравнении двух классификаторов предпочитайте тот, у которого выше AUC. Но помните: AUC измеряет качество ранжирования, а не калибровку. Модель может иметь идеальный AUC, но плохо калиброванные вероятности.' },
        ],
      },
      {
        heading: 'ROC vs. Precision-Recall Curves',
        headingRu: 'ROC vs. PR-кривые',
        blocks: [
          { type: 'text', html: 'When classes are heavily imbalanced (e.g., fraud detection with 0.1% positives), the ROC curve can paint an overly optimistic picture. The <strong>Precision-Recall curve</strong> focuses on the minority class and is more informative in such settings.', htmlRu: 'Когда классы сильно несбалансированы (напр., детекция мошенничества с 0.1% положительных), ROC-кривая может давать чрезмерно оптимистичную картину. <strong>PR-кривая</strong> фокусируется на миноритарном классе и более информативна в таких условиях.' },
          { type: 'formula', math: '\text{AUC-PR} = \sum_n (R_n - R_{n-1}) P_n, \quad \text{AUC-ROC} = \int_0^1 \text{TPR}(\text{FPR})\, d(\text{FPR})', label: 'Comparing AUC-PR and AUC-ROC', labelRu: 'Сравнение AUC-PR и AUC-ROC' },
          { type: 'text', html: '<strong>Multi-class AUC</strong> extends binary AUC using one-vs-rest (macro average) or one-vs-one approaches. The macro-averaged AUC treats all classes equally, while weighted AUC accounts for class frequencies.', htmlRu: '<strong>Многоклассовый AUC</strong> расширяет бинарный AUC через подход один-против-остальных (макро-среднее) или один-против-одного. Макро-усреднённый AUC рассматривает все классы равноправно, тогда как взвешенный учитывает частоты классов.' },
          { type: 'info', variant: 'amber', text: 'Rule of thumb: use ROC-AUC for balanced datasets, PR-AUC for imbalanced ones. In Kaggle competitions with imbalanced targets, PR-AUC is often the official metric.', textRu: 'Практическое правило: используйте ROC-AUC для сбалансированных данных, PR-AUC — для несбалансированных. В соревнованиях Kaggle с несбалансированными целями PR-AUC часто является официальной метрикой.' },
        ],
      },
    ],
    conclusion: 'The ROC curve and AUC provide a threshold-independent way to evaluate classifiers, making them invaluable for comparing models across different operating points. For imbalanced data, supplement with Precision-Recall analysis.',
    conclusionRu: 'ROC-кривая и AUC обеспечивают независимый от порога способ оценки классификаторов, что делает их незаменимыми для сравнения моделей в различных рабочих режимах. Для несбалансированных данных дополните анализом Precision-Recall.',
    references: [
      { title: 'An Introduction to ROC Analysis', authors: 'Tom Fawcett, 2006', url: 'https://doi.org/10.1016/j.patrec.2005.10.010' },
    ],
  },

  /* ---- 7. Cross-Validation ---- */
  {
    slug: 'cross-validation',
    title: 'Cross-Validation',
    titleRu: 'Кросс-валидация',
    subtitle: 'K-Fold Resampling for Robust Model Evaluation',
    subtitleRu: 'K-блочная реорганизация для надёжной оценки модели',
    authors: 'Jared Wilber',
    date: 'July 2023',
    thumbnail: `${BASE}/thumbnail-cross-validation.jpg`,
    sections: [
      {
        heading: 'Why Cross-Validation?',
        headingRu: 'Зачем нужна кросс-валидация?',
        blocks: [
          { type: 'text', html: 'A single train/test split can give a misleading estimate of model performance. <strong>K-Fold Cross-Validation</strong> provides a more robust evaluation by averaging over multiple splits.', htmlRu: 'Одно разбиение на обучающую/тестовую выборки может дать неточную оценку качества модели. <strong>K-блочная кросс-валидация</strong> обеспечивает более надёжную оценку за счёт усреднения по нескольким разбиениям.' },
          { type: 'chart', chart: 'bar', title: 'K-Fold Split Visualization', titleRu: 'Визуализация K-блочного разбиения', description: 'How data is partitioned across K folds', descriptionRu: 'Как данные разделяются на K блоков', interactive: true },
          { type: 'formula', math: '\\hat{E}_{CV} = \\frac{1}{K}\\sum_{k=1}^{K} E_k', label: 'CV error estimate', labelRu: 'Оценка ошибки кросс-валидации' },
          { type: 'text', html: 'The idea is simple: divide your data into K equal parts. Train on K-1 folds and test on the remaining fold. Repeat K times, each time holding out a different fold. The final metric is the average across all K runs.', htmlRu: 'Идея проста: разделите данные на K равных частей. Обучайте на K-1 блоках и тестируйте на оставшемся. Повторите K раз, каждый раз оставляя другой блок. Итоговая метрика — среднее по всем K запускам.' },
        ],
      },
      {
        heading: 'Variants of Cross-Validation',
        headingRu: 'Варианты кросс-валидации',
        blocks: [
          { type: 'text', html: '<strong>Stratified K-Fold</strong> preserves the class distribution in each fold — essential for imbalanced datasets. <strong>Leave-One-Out (LOO)</strong> uses K = N, giving an almost unbiased estimate but at high computational cost.', htmlRu: '<strong>Стратифицированная K-блочная</strong> сохраняет распределение классов в каждом блоке — необходимо для несбалансированных данных. <strong>Leave-One-Out (LOO)</strong> использует K = N, давая почти несмещённую оценку, но с высокими вычислительными затратами.' },
          { type: 'formula', math: '\\text{LOO}: \\hat{E} = \\frac{1}{N}\\sum_{i=1}^{N} L(y_i, \\hat{f}_{-i}(x_i))', label: 'Leave-One-Out error', labelRu: 'Ошибка Leave-One-Out' },
          { type: 'text', html: 'For <strong>time-series data</strong>, standard K-Fold is invalid due to temporal leakage. Use <strong>expanding window</strong> or <strong>rolling window</strong> CV instead, where the test set always comes after the training set in time.', htmlRu: 'Для <strong>временных рядов</strong> стандартная K-блочная невалидна из-за временной утечки. Используйте <strong>расширяющееся окно</strong> или <strong>скользящее окно</strong>, где тестовая выборка всегда идёт после обучающей по времени.' },
          { type: 'info', variant: 'accent', text: 'K=5 or K=10 are standard choices. K=5 gives slightly higher bias but lower variance in the error estimate; K=10 is more computationally expensive but often more accurate.', textRu: 'K=5 или K=10 — стандартный выбор. K=5 даёт чуть большее смещение, но меньшую дисперсию оценки ошибки; K=10 дороже вычислительно, но часто точнее.' },
          { type: 'definition', title: 'Repeated K-Fold', titleRu: 'Повторная K-блочная', math: '\\text{Repeat K-Fold } R \\text{ times with different random splits}', note: 'Reduces variance in the CV estimate. Common: 5-fold × 5 repeats = 25 total fits.', noteRu: 'Уменьшает дисперсию оценки кросс-валидации. Обычно: 5-блочная × 5 повторений = 25 запусков.' },
        ],
      },
      {
        heading: 'Practical Tips & Nested Cross-Validation',
        headingRu: 'Практические советы и вложенная кросс-валидация',
        blocks: [
          { type: 'text', html: '<strong>Nested cross-validation</strong> uses an outer loop for evaluation and an inner loop for hyperparameter tuning. This gives an unbiased performance estimate even when tuning is involved — essential for rigorous model comparison.', htmlRu: '<strong>Вложенная кросс-валидация</strong> использует внешний цикл для оценки и внутренний для настройки гиперпараметров. Это даёт несмещённую оценку качества даже при наличии тюнинга — необходимо для строгого сравнения моделей.' },
          { type: 'info', variant: 'emerald', text: 'When to use CV vs. holdout: CV for small datasets (<100K samples), holdout for large datasets. CV gives better estimates but costs K× more compute. For very large data, even a 1% test set provides reliable evaluation.', textRu: 'Когда использовать CV vs. holdout: CV для малых данных (<100K примеров), holdout для больших. CV даёт лучшие оценки, но стоит K× больше вычислений. Для очень больших данных даже 1% тестовая выборка обеспечивает надёжную оценку.' },
          { type: 'text', html: '<strong>Model selection workflow</strong>: (1) Define candidate models and hyperparameter grids, (2) Run nested CV on each candidate, (3) Select the model with best mean CV score, (4) Retrain on full training data with best hyperparameters, (5) Evaluate once on held-out test set.', htmlRu: '<strong>Рабочий процесс выбора модели</strong>: (1) Определите модели-кандидаты и сетки гиперпараметров, (2) Запустите вложенную CV для каждого кандидата, (3) Выберите модель с лучшим средним CV, (4) Переобучите на полных обучающих данных с лучшими гиперпараметрами, (5) Оцените один раз на тестовой выборке.' },
        ],
      },
    ],
    conclusion: 'Cross-validation is essential for model selection and hyperparameter tuning, providing a more reliable estimate of how your model will generalize to unseen data. Nested CV gives unbiased estimates even during hyperparameter search.',
    conclusionRu: 'Кросс-валидация необходима для выбора модели и настройки гиперпараметров, обеспечивая более надёжную оценку обобщения на новые данные. Вложенная CV даёт несмещённые оценки даже при поиске гиперпараметров.',
    references: [
      { title: 'An Introduction to Statistical Learning', authors: 'James, Witten, Hastie, Tibshirani', url: 'https://www.statlearning.com/' },
    ],
  },

  /* ---- 8. Train, Test, Validation ---- */
  {
    slug: 'train-test-validation',
    title: 'Train, Test, and Validation Sets',
    titleRu: 'Обучающая, тестовая и валидационная выборки',
    subtitle: 'Why Data Splitting Matters for Model Evaluation',
    subtitleRu: 'Почему разделение данных важно для оценки модели',
    authors: 'Jared Wilber',
    date: 'August 2023',
    thumbnail: `${BASE}/thumbnail-train-test-validation.jpg`,
    sections: [
      {
        heading: 'The Three Splits',
        headingRu: 'Три выборки',
        blocks: [
          { type: 'text', html: 'Proper data splitting is crucial: the <strong>training set</strong> teaches the model, the <strong>validation set</strong> tunes hyperparameters, and the <strong>test set</strong> provides an unbiased performance estimate.', htmlRu: 'Правильное разделение данных критично: <strong>обучающая выборка</strong> обучает модель, <strong>валидационная</strong> настраивает гиперпараметры, а <strong>тестовая</strong> даёт несмещённую оценку качества.' },
          { type: 'chart', chart: 'bar', title: 'Performance Across Data Splits', titleRu: 'Качество по различным выборкам', description: 'How models perform on train vs. validation vs. test data', descriptionRu: 'Как модель работает на обучающей vs. валидационной vs. тестовой выборке', interactive: true },
          { type: 'info', variant: 'accent', text: 'Never tune hyperparameters on the test set — this leads to overly optimistic performance estimates and poor generalization.', textRu: 'Никогда не настраивайте гиперпараметры на тестовой выборке — это даёт завышенные оценки качества и плохое обобщение.' },
          { type: 'text', html: 'A common starting point is a <strong>60/20/20</strong> or <strong>70/15/15</strong> split. With very large datasets (>1M samples), even a 98/1/1 split can provide enough data for validation and testing.', htmlRu: 'Обычная отправная точка — разбиение <strong>60/20/20</strong> или <strong>70/15/15</strong>. С очень большими данными (>1M примеров) даже разбиение 98/1/1 обеспечивает достаточно данных для валидации и тестирования.' },
        ],
      },
      {
        heading: 'Data Leakage & Common Pitfalls',
        headingRu: 'Утечка данных и типичные ошибки',
        blocks: [
          { type: 'text', html: '<strong>Data leakage</strong> occurs when information from the test/validation set inadvertently influences training. Common sources include: preprocessing on the entire dataset before splitting, duplicate samples across splits, and temporal leakage in time-series data.', htmlRu: '<strong>Утечка данных</strong> возникает, когда информация из тестовой/валидационной выборки невольно влияет на обучение. Частые источники: предобработка всего набора данных до разделения, дубликаты между выборками и временная утечка в данных временных рядов.' },
          { type: 'definition', title: 'Correct Preprocessing Order', titleRu: 'Правильный порядок предобработки', math: '\\text{1. Split} \\to \\text{2. Fit scaler on train} \\to \\text{3. Transform all}', note: 'Always fit preprocessing (scalers, imputers, encoders) on the training set only, then transform validation/test.', noteRu: 'Всегда обучайте предобработку (скейлеры, импьютеры, энкодеры) только на обучающей выборке, затем трансформируйте валидацию/тест.' },
          { type: 'chart', chart: 'area', title: 'Learning Curves: Train vs. Validation Error', titleRu: 'Кривые обучения: ошибка на обучении vs. валидации', description: 'Diagnose underfitting and overfitting from learning curves', descriptionRu: 'Диагностика недообучения и переобучения по кривым обучения', interactive: true },
          { type: 'info', variant: 'amber', text: 'For time-series data, use temporal splitting (train on past, test on future) rather than random shuffling. Random splits can leak future information into the training set.', textRu: 'Для временных рядов используйте временное разбиение (обучение на прошлом, тест на будущем), а не случайное перемешивание. Случайные разбиения могут пропустить будущую информацию в обучающую выборку.' },
        ],
      },
      {
        heading: 'Advanced Splitting Strategies',
        headingRu: 'Продвинутые стратегии разбиения',
        blocks: [
          { type: 'text', html: '<strong>Stratified splitting</strong> preserves class proportions across all splits — essential when dealing with imbalanced datasets (e.g., fraud detection with 0.1% positives). Without stratification, some splits may have zero positive examples.', htmlRu: '<strong>Стратифицированное разбиение</strong> сохраняет пропорции классов по всем выборкам — необходимо для несбалансированных данных (напр., детекция мошенничества с 0.1% положительных). Без стратификации некоторые разбиения могут не содержать положительных примеров.' },
          { type: 'text', html: '<strong>Group splitting</strong> ensures that all samples from the same group (patient, user, product) stay in one split. This prevents data leakage from correlated samples and tests true generalization to unseen groups.', htmlRu: '<strong>Групповое разбиение</strong> гарантирует, что все примеры из одной группы (пациент, пользователь, продукт) остаются в одной выборке. Это предотвращает утечку данных из коррелированных примеров и проверяет реальное обобщение на новые группы.' },
          { type: 'formula', math: '\text{GroupKFold}: \forall g \in G, \text{all samples of } g \text{ in same fold}', label: 'Group-aware cross-validation', labelRu: 'Кросс-валидация с учётом групп' },
          { type: 'info', variant: 'emerald', text: 'The Yandex ML Handbook emphasizes: for large datasets (>1M), a simple 98/1/1 split often works better than K-fold CV. The test set is large enough for statistical significance, and you save K× compute.', textRu: 'Хендбук Яндекса по ML подчёркивает: для больших данных (>1M) простое разбиение 98/1/1 часто работает лучше K-блочной CV. Тестовая выборка достаточно велика для статистической значимости, и вы экономите K× вычислений.' },
        ],
      },
    ],
    conclusion: 'The train/validation/test split is the foundation of rigorous ML evaluation. Each set serves a distinct purpose in the model development pipeline. Stratified and group-aware splits prevent subtle data leakage that can lead to overly optimistic estimates.',
    conclusionRu: 'Разделение на обучающую/валидационную/тестовую выборки — основа строгой оценки ML-моделей. Каждая выборка выполняет свою функцию в процессе разработки. Стратифицированные и групповые разбиения предотвращают тонкие утечки данных, ведущие к завышенным оценкам.',
    references: [
      { title: 'Elements of Statistical Learning', authors: 'Hastie, Tibshirani, Friedman', url: 'https://hastie.su.domains/ElemStatLearn/' },
    ],
  },

  /* ---- 9. Precision & Recall ---- */
  {
    slug: 'precision-recall',
    title: 'Precision & Recall',
    titleRu: 'Точность и полнота',
    subtitle: 'Beyond Accuracy: Evaluating Classification Models',
    subtitleRu: 'За рамками accuracy: оценка классификационных моделей',
    authors: 'Jared Wilber',
    date: 'September 2023',
    thumbnail: `${BASE}/thumbnail-precision-recall.jpg`,
    sections: [
      {
        heading: 'The Confusion Matrix',
        headingRu: 'Матрица ошибок',
        blocks: [
          { type: 'text', html: 'The <strong>confusion matrix</strong> summarizes the performance of a classification model by counting true positives, true negatives, false positives, and false negatives.', htmlRu: '<strong>Матрица ошибок</strong> суммирует качество классификационной модели, подсчитывая истинно положительные, истинно отрицательные, ложноположительные и ложноотрицательные.' },
          { type: 'formula', math: '\\text{Precision} = \\frac{TP}{TP + FP}, \\quad \\text{Recall} = \\frac{TP}{TP + FN}', label: 'Precision & Recall', labelRu: 'Точность и полнота' },
          { type: 'definition', title: 'F1 Score', titleRu: 'F1-мера', math: 'F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}', note: 'The harmonic mean of precision and recall. Balances both concerns.', noteRu: 'Гармоническое среднее точности и полноты. Балансирует обе задачи.' },
          { type: 'chart', chart: 'bar', title: 'Precision-Recall Trade-off', titleRu: 'Компромисс точности и полноты', description: 'How changing the threshold affects precision and recall', descriptionRu: 'Как изменение порога влияет на точность и полноту', interactive: true },
          { type: 'text', html: 'High precision means few false positives (important for spam detection). High recall means few false negatives (critical for disease diagnosis). The <strong>F1 score</strong> balances both concerns as their harmonic mean.', htmlRu: 'Высокая точность означает мало ложноположительных (важно для детекции спама). Высокая полнота — мало ложноотрицательных (критично для диагностики заболеваний). <strong>F1-мера</strong> балансирует обе задачи как их гармоническое среднее.' },
        ],
      },
      {
        heading: 'Precision-Recall Curves',
        headingRu: 'PR-кривые',
        blocks: [
          { type: 'text', html: 'The <strong>PR curve</strong> plots Precision vs. Recall at all thresholds. Unlike ROC, PR curves are sensitive to class imbalance, making them more informative for imbalanced datasets.', htmlRu: '<strong>PR-кривая</strong> отображает точность vs. полноту на всех порогах. В отличие от ROC, PR-кривые чувствительны к дисбалансу классов, что делает их более информативными для несбалансированных данных.' },
          { type: 'chart', chart: 'roc', title: 'Precision-Recall Curve Comparison', titleRu: 'Сравнение PR-кривых', description: 'Comparing PR curves for balanced vs. imbalanced datasets', descriptionRu: 'Сравнение PR-кривых для сбалансированных vs. несбалансированных данных', interactive: true },
          { type: 'definition', title: 'Average Precision (AP)', titleRu: 'Средняя точность (AP)', math: 'AP = \\sum_n (R_n - R_{n-1}) P_n', note: 'The area under the PR curve. A single-number summary of classifier quality across all thresholds.', noteRu: 'Площадь под PR-кривой. Единичная метрика качества классификатора на всех порогах.' },
          { type: 'info', variant: 'emerald', text: 'When classes are heavily imbalanced (e.g., 1% positive), prefer PR curves over ROC curves. A high AUC-ROC can mask poor precision on the minority class.', textRu: 'При сильном дисбалансе классов (напр., 1% положительных) предпочитайте PR-кривые ROC-кривым. Высокий AUC-ROC может скрыть плохую точность на миноритарном классе.' },
        ],
      },
      {
        heading: 'Multi-class & Beyond',
        headingRu: 'Многоклассовая классификация и за её пределами',
        blocks: [
          { type: 'text', html: 'For <strong>multi-class classification</strong>, compute precision, recall, and F1 per class, then aggregate: <strong>Macro-F1</strong> (unweighted average) treats all classes equally, <strong>Weighted-F1</strong> accounts for class frequencies, <strong>Micro-F1</strong> computes global TP/FP/FN.', htmlRu: 'Для <strong>многоклассовой классификации</strong> вычисляйте точность, полноту и F1 по каждому классу, затем агрегируйте: <strong>Макро-F1</strong> (невзвешенное среднее) рассматривает все классы равноправно, <strong>Взвешенный F1</strong> учитывает частоты классов, <strong>Микро-F1</strong> вычисляет глобальные TP/FP/FN.' },
          { type: 'formula', math: 'F_\beta = (1+\beta^2) \cdot \frac{P \cdot R}{\beta^2 P + R}', label: 'F-beta score (weight recall vs. precision)', labelRu: 'F-beta мера (вес полноты vs. точности)' },
          { type: 'text', html: '<strong>Cohen\'s Kappa</strong> adjusts accuracy for chance agreement, useful when class distributions are skewed. <strong>Matthews Correlation Coefficient (MCC)</strong> is a balanced measure that can be used even with extreme imbalance.', htmlRu: '<strong>Коэффициент Каппа Коэна</strong> корректирует accuracy на случайное согласие, полезен при перекошенных распределениях классов. <strong>Коэффициент корреляции Мэтьюса (MCC)</strong> — сбалансированная мера, применимая даже при экстремальном дисбалансе.' },
          { type: 'info', variant: 'accent', text: 'For object detection: <strong>mAP</strong> (mean Average Precision at IoU=0.5) is the standard metric. It computes AP for each class then averages, combining localization quality and classification accuracy.', textRu: 'Для детекции объектов: <strong>mAP</strong> (средняя средняя точность при IoU=0.5) — стандартная метрика. Она вычисляет AP для каждого класса, затем усредняет, объединяя качество локализации и точность классификации.' },
        ],
      },
    ],
    conclusion: 'When accuracy is misleading (e.g., imbalanced datasets), precision and recall provide a much clearer picture of model performance. Multi-class extensions (Macro-F1, Micro-F1) and domain-specific metrics (mAP) extend these concepts broadly.',
    conclusionRu: 'Когда accuracy вводит в заблуждение (например, при несбалансированных данных), точность и полнота дают гораздо более ясную картину качества модели. Многоклассовые расширения (Макро-F1, Микро-F1) и доменно-специфичные метрики (mAP) широко расширяют эти концепции.',
    references: [
      { title: 'The Relationship Between Precision-Recall and ROC Curves', authors: 'Davis & Goadrich, 2006', url: 'https://doi.org/10.1145/1143844.1143874' },
    ],
  },

  /* ---- 10. Random Forest ---- */
  {
    slug: 'random-forest',
    title: 'Random Forest',
    titleRu: 'Случайный лес',
    subtitle: 'The Power of Ensemble Learning',
    subtitleRu: 'Сила ансамблевого обучения',
    authors: 'Jared Wilber',
    date: 'October 2023',
    thumbnail: `${BASE}/thumbnail-random-forest.jpg`,
    sections: [
      {
        heading: 'Ensemble of Decision Trees',
        headingRu: 'Ансамбль решающих деревьев',
        blocks: [
          { type: 'text', html: 'A <strong>Random Forest</strong> builds many decision trees on random subsets of the data and combines their predictions through <strong>majority voting</strong> (classification) or <strong>averaging</strong> (regression).', htmlRu: '<strong>Случайный лес</strong> строит множество решающих деревьев на случайных подвыборках данных и объединяет их предсказания через <strong>мажоритарное голосование</strong> (классификация) или <strong>усреднение</strong> (регрессия).' },
          { type: 'chart', chart: 'forest', title: 'Forest of Trees Voting', titleRu: 'Голосование леса деревьев', description: 'How multiple trees combine for a robust prediction', descriptionRu: 'Как несколько деревьев объединяются для надёжного предсказания', interactive: true },
          { type: 'formula', math: '\\hat{y} = \\frac{1}{B}\\sum_{b=1}^{B} T_b(x)', label: 'Forest prediction (regression)', labelRu: 'Предсказание леса (регрессия)' },
          { type: 'text', html: 'The randomness introduced by <strong>bagging</strong> (bootstrap aggregating) and <strong>feature subsetting</strong> reduces overfitting compared to individual trees.', htmlRu: 'Случайность, вносимая <strong>бэггингом</strong> (бутстрап-агрегирование) и <strong>подмножеством признаков</strong>, уменьшает переобучение по сравнению с отдельными деревьями.' },
          { type: 'text', html: 'Random Forest also provides built-in <strong>feature importance</strong> scores, measuring how much each feature reduces impurity across all trees. This is invaluable for feature selection and model interpretability.', htmlRu: 'Случайный лес также предоставляет встроенные оценки <strong>важности признаков</strong>, измеряя, насколько каждый признак уменьшает неопределённость по всем деревьям. Это бесценно для отбора признаков и интерпретируемости модели.' },
          { type: 'definition', title: 'Out-of-Bag (OOB) Error', titleRu: 'Ошибка Out-of-Bag (OOB)', math: '\\hat{E}_{OOB} = \\frac{1}{N}\\sum_{i=1}^{N} L(y_i, \\hat{f}_{-i}(x_i))', note: 'Each sample is held out from ~37% of trees. OOB error is a free cross-validation estimate — no separate validation set needed.', noteRu: 'Каждый пример исключён из ~37% деревьев. OOB-ошибка — бесплатная оценка кросс-валидации — без отдельной валидационной выборки.' },
        ],
      },
      {
        heading: 'Hyperparameter Tuning',
        headingRu: 'Настройка гиперпараметров',
        blocks: [
          { type: 'text', html: 'Key hyperparameters include: <strong>number of trees</strong> (more = better, diminishing returns), <strong>max depth</strong> (controls overfitting), <strong>min samples per leaf</strong> (regularization), and <strong>max features per split</strong> (diversity).', htmlRu: 'Ключевые гиперпараметры: <strong>количество деревьев</strong> (больше = лучше, но убывающая отдача), <strong>максимальная глубина</strong> (контроль переобучения), <strong>мин. примеров на лист</strong> (регуляризация) и <strong>макс. признаков на разделение</strong> (разнообразие).' },
          { type: 'chart', chart: 'area', title: 'Performance vs. Number of Trees', titleRu: 'Качество vs. количество деревьев', description: 'How accuracy improves as more trees are added', descriptionRu: 'Как улучшается точность при добавлении деревьев', interactive: true },
          { type: 'info', variant: 'emerald', text: 'Random Forest rarely overfits with more trees. Start with 100-500 trees and increase if needed. The main cost is memory and inference time, not overfitting.', textRu: 'Случайный лес редко переобучается с ростом числа деревьев. Начните со 100–500 и увеличивайте при необходимости. Основная стоимость — память и время инференса, а не переобучение.' },
          { type: 'text', html: 'As the Yandex ML Handbook explains, ensemble methods like Random Forest combine multiple models to achieve <strong>higher accuracy and stability</strong> than any individual model. Bagging and feature subsetting compensate for the weaknesses of individual base models, making Random Forest one of the most robust approaches in classical ML.', htmlRu: 'Как объясняет хендбук Яндекса по ML, ансамблевые методы, такие как случайный лес, объединяют несколько моделей для достижения <strong>более высокой точности и устойчивости</strong>, чем любая отдельная модель. Бэггинг и подмножество признаков компенсируют слабости отдельных базовых моделей, делая случайный лес одним из самых надёжных подходов в классическом ML.' },
          { type: 'formula', math: '\\text{Importance}(j) = \\frac{1}{B}\\sum_{b=1}^{B} \\sum_{t \\in T_b: v(t)=j} \\Delta I(t)', label: 'Feature importance (mean decrease in impurity)', labelRu: 'Важность признака (среднее уменьшение неопределённости)' },
        ],
      },
      {
        heading: 'Random Forest in Practice',
        headingRu: 'Случайный лес на практике',
        blocks: [
          { type: 'text', html: '<strong>Extremely Randomized Trees (ExtraTrees)</strong> add more randomness: instead of finding the best split point, they pick a random split point for each feature. This reduces variance further and is faster to train, often matching Random Forest performance.', htmlRu: '<strong>Чрезвычайно рандомизированные деревья (ExtraTrees)</strong> добавляют больше случайности: вместо поиска лучшей точки разделения они выбирают случайную точку для каждого признака. Это дополнительно снижает дисперсию и быстрее обучается, часто достигая качества случайного леса.' },
          { type: 'text', html: '<strong>Limitations</strong>: Random Forest doesn\'t extrapolate well (can\'t predict values outside training range), struggles with very noisy data, and produces larger models than GBDT. For regression with many continuous features, gradient boosting often outperforms.', htmlRu: '<strong>Ограничения</strong>: случайный лес плохо экстраполирует (не может предсказывать значения вне диапазона обучения), плохо работает с очень шумными данными и создаёт большие модели, чем GBDT. Для регрессии с множеством непрерывных признаков градиентный бустинг часто превосходит.' },
          { type: 'info', variant: 'accent', text: 'When to use Random Forest vs. GBDT: Random Forest for quick baselines, parallel training, and robustness to hyperparameters. GBDT for maximum accuracy, interpretability (SHAP), and when you can afford sequential training.', textRu: 'Когда использовать случайный лес vs. GBDT: случайный лес для быстрых базовых моделей, параллельного обучения и устойчивости к гиперпараметрам. GBDT для максимальной точности, интерпретируемости (SHAP) и когда допустимо последовательное обучение.' },
        ],
      },
    ],
    conclusion: 'Random Forest is one of the most widely-used and robust ML algorithms. Its ability to handle high-dimensional data with minimal tuning, built-in feature importance, and OOB error estimation make it a go-to choice for many practitioners.',
    conclusionRu: 'Случайный лес — один из самых популярных и надёжных алгоритмов МО. Его способность работать с многомерными данными при минимальной настройке делает его выбором номер один для многих специалистов.',
    references: [
      { title: 'Random Forests', authors: 'Leo Breiman, 2001', url: 'https://doi.org/10.1023/A:1010933404324' },
      { title: 'Введение в ML — Ансамбли и градиентный бустинг (Хендбук Яндекса)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/vvedenie-glava-dva' },
    ],
  },

  /* ---- 11. Decision Trees ---- */
  {
    slug: 'decision-trees',
    title: 'Decision Trees',
    titleRu: 'Решающие деревья',
    subtitle: 'Splitting Data with Entropy and Information Gain',
    subtitleRu: 'Разделение данных по энтропии и приросту информации',
    authors: 'Jared Wilber',
    date: 'November 2023',
    thumbnail: `${BASE}/thumbnail-decision-tree.jpg`,
    sections: [
      {
        heading: 'How Trees Split Data',
        headingRu: 'Как деревья разделяют данные',
        blocks: [
          { type: 'text', html: 'Decision trees recursively partition the feature space by choosing the split that maximizes <strong>information gain</strong> — the reduction in uncertainty.', htmlRu: 'Решающие деревья рекурсивно разделяют пространство признаков, выбирая разделение, максимизирующее <strong>прирост информации</strong> — уменьшение неопределённости.' },
          { type: 'formula', math: 'H(S) = -\\sum_{i=1}^{c} p_i \\log_2 p_i', label: 'Entropy', labelRu: 'Энтропия' },
          { type: 'formula', math: 'IG(S, A) = H(S) - \\sum_{v \\in A} \\frac{|S_v|}{|S|} H(S_v)', label: 'Information Gain', labelRu: 'Прирост информации' },
          { type: 'chart', chart: 'tree', title: 'Interactive Decision Tree', titleRu: 'Интерактивное решающее дерево', description: 'Watch the tree grow and split the data', descriptionRu: 'Наблюдайте, как дерево растёт и разделяет данные', interactive: true },
          { type: 'info', variant: 'amber', text: 'Going too deep leads to overfitting. Pruning and max-depth constraints are essential regularization techniques.', textRu: 'Слишком глубокие деревья ведут к переобучению. Обрезка и ограничения максимальной глубины — необходимые методы регуляризации.' },
          { type: 'text', html: 'Decision trees can use either <strong>entropy</strong> or <strong>Gini impurity</strong> as the splitting criterion. In practice, they produce similar trees — Gini is faster to compute.', htmlRu: 'Решающие деревья могут использовать <strong>энтропию</strong> или <strong>критерий Джини</strong> как критерий разделения. На практике они дают похожие деревья — Джини быстрее вычисляется.' },
          { type: 'formula', math: '\\text{Gini}(S) = 1 - \\sum_{i=1}^{c} p_i^2', label: 'Gini Impurity', labelRu: 'Критерий Джини' },
        ],
      },
      {
        heading: 'Pruning and Regularization',
        headingRu: 'Обрезка и регуляризация',
        blocks: [
          { type: 'text', html: 'Unconstrained trees will memorize the training data perfectly. <strong>Pre-pruning</strong> stops growth early (max depth, min samples per split). <strong>Post-pruning</strong> (cost-complexity pruning) grows the full tree then removes branches that don\'t improve validation performance.', htmlRu: 'Неограниченные деревья идеально запомнят обучающие данные. <strong>Предобрезка</strong> останавливает рост рано (макс. глубина, мин. примеров на разделение). <strong>Постобрезка</strong> (обрезка по сложности) строит полное дерево, затем удаляет ветви, не улучшающие качество на валидации.' },
          { type: 'formula', math: 'C_\\alpha(T) = \\sum_{m=1}^{|T|} N_m Q_m(T) + \\alpha |T|', label: 'Cost-complexity pruning (CART)', labelRu: 'Обрезка по сложности (CART)' },
          { type: 'chart', chart: 'line', title: 'Tree Depth vs. Train/Test Accuracy', titleRu: 'Глубина дерева vs. точность на обучении/тесте', description: 'The overfitting effect of increasing tree depth', descriptionRu: 'Эффект переобучения при увеличении глубины дерева', interactive: true },
          { type: 'info', variant: 'accent', text: 'Decision trees are the building blocks of the most powerful ML algorithms: Random Forest, Gradient Boosting (XGBoost, LightGBM), and AdaBoost all combine trees into ensembles.', textRu: 'Решающие деревья — строительные блоки самых мощных алгоритмов МО: случайный лес, градиентный бустинг (XGBoost, LightGBM) и AdaBoost объединяют деревья в ансамбли.' },
        ],
      },
      {
        heading: 'Trees, Ensembles & Boosting (Yandex ML Handbook)',
        headingRu: 'Деревья, ансамбли и бустинг (Хендбук Яндекса по ML)',
        blocks: [
          { type: 'text', html: 'Decision trees build a complex decision surface through <strong>hierarchical partitioning</strong> of the feature space. This process is intuitive and mimics the natural human decision-making mechanism, making these models <strong>highly interpretable</strong>.', htmlRu: 'Решающие деревья строят сложную решающую поверхность путём <strong>иерархического разделения</strong> пространства признаков. Этот процесс интуитивно понятен и имитирует естественный для человека механизм принятия решений, что делает такие модели <strong>хорошо интерпретируемыми</strong>.' },
          { type: 'text', html: 'The Yandex ML Handbook highlights several ensemble techniques built on trees: <strong>Bagging</strong> trains models independently on random subsets and averages predictions. <strong>Stacking</strong> combines predictions from different model types using a meta-learner. <strong>Gradient Boosting</strong> (GBDT) builds trees sequentially, where each new tree corrects the errors of previous ones — the industry standard for tabular data.', htmlRu: 'Хендбук Яндекса по ML выделяет несколько ансамблевых техник на основе деревьев: <strong>бэггинг</strong> обучает модели независимо на случайных подвыборках и усредняет предсказания. <strong>Стекинг</strong> объединяет предсказания разных типов моделей с помощью мета-обучателя. <strong>Градиентный бустинг</strong> (GBDT) строит деревья последовательно, где каждое новое дерево исправляет ошибки предыдущих — стандарт индустрии для табличных данных.' },
          { type: 'info', variant: 'emerald', text: 'Gradient Boosted Decision Trees (GBDT) is the most powerful non-neural network family. Unlike bagging\'s independent training, boosting builds the ensemble sequentially — each algorithm aims to fix the mistakes of the previous ones. GBDT wins most modern ML competitions on heterogeneous tabular data.', textRu: 'Градиентный бустинг решающих деревьев (GBDT) — самое мощное семейство не-нейросетевых моделей. В отличие от независимого обучения в бэггинге, бустинг реализует идею последовательного построения ансамбля, где каждый следующий алгоритм исправляет ошибки предыдущих. GBDT выигрывает большинство современных соревнований по ML на неоднородных табличных данных.' },
        ],
      },
    ],
    conclusion: 'Decision trees are intuitive, interpretable, and form the foundation for powerful ensemble methods like Random Forest and Gradient Boosting.',
    conclusionRu: 'Решающие деревья интуитивно понятны, интерпретируемы и образуют основу мощных ансамблевых методов — случайного леса и градиентного бустинга.',
    references: [
      { title: 'Classification and Regression Trees', authors: 'Breiman, Friedman, Olshen, Stone', url: 'https://doi.org/10.1201/9781315139470' },
      { title: 'Введение в ML — Классическое обучение с учителем (Хендбук Яндекса)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/vvedenie-glava-dva' },
    ],
  },

  /* ---- 12. Bias Variance Tradeoff ---- */
  {
    slug: 'bias-variance',
    title: 'The Bias-Variance Tradeoff',
    titleRu: 'Компромисс смещения и дисперсии',
    subtitle: 'Balancing Underfitting and Overfitting',
    subtitleRu: 'Баланс между недообучением и переобучением',
    authors: 'Jared Wilber',
    date: 'December 2023',
    thumbnail: `${BASE}/thumbnail-bias-variance.jpg`,
    sections: [
      {
        heading: 'Decomposing Error',
        headingRu: 'Декомпозиция ошибки',
        blocks: [
          { type: 'text', html: 'The total prediction error can be decomposed into <strong>bias</strong> (error from wrong assumptions), <strong>variance</strong> (sensitivity to training data), and <strong>irreducible noise</strong>.', htmlRu: 'Полная ошибка предсказания может быть разложена на <strong>смещение</strong> (ошибка из-за неверных допущений), <strong>дисперсию</strong> (чувствительность к обучающим данным) и <strong>неустранимый шум</strong>.' },
          { type: 'formula', math: 'E[(y - \\hat{f}(x))^2] = \\text{Bias}[\\hat{f}(x)]^2 + \\text{Var}[\\hat{f}(x)] + \\sigma^2', label: 'Bias-variance decomposition', labelRu: 'Декомпозиция смещения и дисперсии' },
          { type: 'chart', chart: 'area', title: 'Bias vs. Variance vs. Total Error', titleRu: 'Смещение vs. дисперсия vs. полная ошибка', description: 'The U-shaped total error curve as model complexity increases', descriptionRu: 'U-образная кривая полной ошибки при росте сложности модели', interactive: true },
        ],
      },
      {
        heading: 'Interactive: LOESS and KNN',
        headingRu: 'Интерактив: LOESS и KNN',
        blocks: [
          { type: 'text', html: 'Adjust the smoothing parameter to see how bias and variance change. Low smoothing = low bias, high variance (overfitting). High smoothing = high bias, low variance (underfitting).', htmlRu: 'Настройте параметр сглаживания, чтобы увидеть, как меняются смещение и дисперсия. Малое сглаживание = низкое смещение, высокая дисперсия (переобучение). Большое сглаживание = высокое смещение, низкая дисперсия (недообучение).' },
          { type: 'chart', chart: 'scatter', title: 'LOESS Smoothing Parameter', titleRu: 'Параметр сглаживания LOESS', description: 'Adjust to see the bias-variance effect in real-time', descriptionRu: 'Настройте для наблюдения эффекта смещения-дисперсии в реальном времени', interactive: true },
          { type: 'text', html: '<strong>Learning curves</strong> (training error vs. validation error as a function of training set size) are the most practical diagnostic tool. If both converge to a high value, the model has high bias. If they diverge widely, the model has high variance.', htmlRu: '<strong>Кривые обучения</strong> (ошибка на обучении vs. валидации как функция размера обучающей выборки) — самый практичный инструмент диагностики. Если обе сходятся к высокому значению — высокое смещение. Если сильно расходятся — высокая дисперсия.' },
          { type: 'info', variant: 'accent', text: 'Practical rule: high bias → add features or use a more complex model. High variance → add data, add regularization, or simplify the model.', textRu: 'Практическое правило: высокое смещение → добавьте признаки или более сложную модель. Высокая дисперсия → добавьте данные, регуляризацию или упростите модель.' },
        ],
      },
      {
        heading: 'Regularization & Modern Perspectives',
        headingRu: 'Регуляризация и современные перспективы',
        blocks: [
          { type: 'text', html: '<strong>Regularization</strong> explicitly controls the bias-variance tradeoff by penalizing model complexity. L1 (Lasso) promotes sparsity, L2 (Ridge) shrinks weights toward zero, and Elastic Net combines both.', htmlRu: '<strong>Регуляризация</strong> явно контролирует компромисс смещения-дисперсии, штрафуя сложность модели. L1 (Lasso) продвигает разреженность, L2 (Ridge) сжимает веса к нулю, Elastic Net объединяет оба.' },
          { type: 'formula', math: 'L_{\text{reg}} = L_{\text{data}} + \lambda_1 \|w\|_1 + \lambda_2 \|w\|_2^2', label: 'Elastic Net regularization', labelRu: 'Регуляризация Elastic Net' },
          { type: 'text', html: 'Modern deep learning challenges the classical tradeoff: <strong>overparameterized models</strong> (millions of parameters trained on thousands of examples) can generalize well. This is explained by double descent, implicit regularization from SGD, and explicit techniques like dropout and weight decay.', htmlRu: 'Современное глубокое обучение бросает вызов классическому компромиссу: <strong>сверхпараметризованные модели</strong> (миллионы параметров на тысячах примеров) могут хорошо обобщать. Это объясняется двойным спуском, неявной регуляризацией от SGD и явными техниками: dropout и weight decay.' },
          { type: 'info', variant: 'emerald', text: 'Diagnostic checklist: (1) Plot learning curves. (2) If high bias: try more complex model, add features, reduce regularization. (3) If high variance: get more data, try simpler model, increase regularization, use dropout/early stopping.', textRu: 'Чек-лист диагностики: (1) Постройте кривые обучения. (2) Если высокое смещение: попробуйте более сложную модель, добавьте признаки, уменьшите регуляризацию. (3) Если высокая дисперсия: добавьте данные, попробуйте более простую модель, усильте регуляризацию, используйте dropout/early stopping.' },
        ],
      },
    ],
    conclusion: 'The bias-variance tradeoff is a fundamental concept in ML. Finding the sweet spot between underfitting and overfitting is the central challenge of model selection. Regularization techniques and modern understanding (double descent) provide practical tools for navigating this tradeoff.',
    conclusionRu: 'Компромисс смещения и дисперсии — фундаментальная концепция МО. Поиск баланса между недообучением и переобучением — главная задача выбора модели. Техники регуляризации и современное понимание (двойной спуск) предоставляют практические инструменты для этого баланса.',
    references: [
      { title: 'Elements of Statistical Learning', authors: 'Hastie, Tibshirani, Friedman', url: 'https://hastie.su.domains/ElemStatLearn/' },
    ],
  },

  /* ---- 13. Double Descent: Visual ---- */
  {
    slug: 'double-descent',
    title: 'Double Descent: A Visual Introduction',
    titleRu: 'Двойной спуск: визуальное введение',
    subtitle: 'The Surprising Behavior of Modern ML Models',
    subtitleRu: 'Неожиданное поведение современных ML-моделей',
    authors: 'Jared Wilber',
    date: 'January 2024',
    thumbnail: `${BASE}/thumbnail-double-descent.jpg`,
    sections: [
      {
        heading: 'The Double Descent Phenomenon',
        headingRu: 'Феномен двойного спуска',
        blocks: [
          { type: 'text', html: 'In classical ML, test error follows a U-shape as model complexity increases. But in modern deep learning, test error can <strong>decrease again</strong> past the interpolation threshold — this is <strong>double descent</strong>.', htmlRu: 'В классическом МО тестовая ошибка следует U-образной кривой при росте сложности модели. Но в современном глубоком обучении тестовая ошибка может <strong>снова уменьшиться</strong> за порогом интерполяции — это <strong>двойной спуск</strong>.' },
          { type: 'chart', chart: 'line', title: 'Prediction Error vs. Model Complexity', titleRu: 'Ошибка предсказания vs. сложность модели', description: 'The classic U-shape followed by a second descent', descriptionRu: 'Классическая U-образная кривая с последующим вторым спуском', interactive: true },
          { type: 'text', html: 'The interpolation regime — where the model perfectly fits the training data — is where test error peaks before descending again.', htmlRu: 'Режим интерполяции — где модель идеально подгоняет обучающие данные — это где тестовая ошибка достигает пика перед повторным спуском.' },
          { type: 'info', variant: 'accent', text: 'This phenomenon challenges the classical bias-variance tradeoff and suggests that overparameterized models can generalize well.', textRu: 'Этот феномен бросает вызов классическому компромиссу смещения-дисперсии и предполагает, что сверхпараметризованные модели могут хорошо обобщать.' },
          { type: 'text', html: 'In the <strong>classical regime</strong> (parameters < data points), there are not enough parameters to fit the noise. In the <strong>interpolation regime</strong> (parameters = data points), the model barely fits. Beyond this threshold, the model has <strong>excess capacity</strong> and gradient descent selects the simplest interpolating solution.', htmlRu: 'В <strong>классическом режиме</strong> (параметров < точек данных) параметров недостаточно для подгонки шума. В <strong>режиме интерполяции</strong> (параметров = точек данных) модель едва подгоняет. За этим порогом модель имеет <strong>избыточную ёмкость</strong>, и градиентный спуск выбирает простейшее интерполирующее решение.' },
        ],
      },
      {
        heading: 'Three Regimes of Model Complexity',
        headingRu: 'Три режима сложности модели',
        blocks: [
          { type: 'definition', title: 'Interpolation Threshold', titleRu: 'Порог интерполяции', math: 'p = n \quad \text{(parameters = data points)}', note: 'The peak of test error occurs exactly at the interpolation threshold — where the model first achieves zero training error. This is the most dangerous zone for generalization.', noteRu: 'Пик тестовой ошибки возникает ровно на пороге интерполяции — где модель впервые достигает нулевой ошибки обучения. Это самая опасная зона для обобщения.' },
          { type: 'text', html: '<strong>Epochal double descent</strong> also exists: test error can spike and then decrease again as training time increases. A model that initially overfits can "grok" the pattern with continued training, eventually generalizing well.', htmlRu: '<strong>Эпохальный двойной спуск</strong> также существует: тестовая ошибка может вырасти и затем снова уменьшиться по мере увеличения времени обучения. Модель, которая первоначально переобучается, может «понять» паттерн при продолжении обучения, в итоге хорошо обобщая.' },
          { type: 'text', html: 'The phenomenon has been observed across architectures (CNNs, Transformers, linear models), loss functions, and datasets. It suggests that <strong>overparameterization + optimization</strong> together act as an implicit regularizer.', htmlRu: 'Феномен наблюдался across различных архитектур (CNN, трансформеры, линейные модели), функций потерь и датасетов. Это предполагает, что <strong>сверхпараметризация + оптимизация</strong> вместе действуют как неявный регуляризатор.' },
          { type: 'info', variant: 'emerald', text: 'Practical implication: don\'t stop adding capacity just because test error starts rising — in the overparameterized regime, bigger models can generalize better. The key is using proper optimization (SGD with momentum or Adam).', textRu: 'Практическое следствие: не останавливайтесь при добавлении ёмкости только потому, что тестовая ошибка начинает расти — в сверхпараметризованном режиме большие модели могут обобщать лучше. Ключ — использование правильной оптимизации (SGD с моментом или Adam).' },
          { type: 'info', variant: 'amber', text: 'Scaling laws (Kaplan et al., 2020) show that for language models, test loss decreases as a power law with model size, data size, and compute — consistent with the second descent regime.', textRu: 'Законы масштабирования (Kaplan et al., 2020) показывают, что для языковых моделей ошибка на тесте убывает по степенному закону с размером модели, объёмом данных и вычислениями — согласуясь с режимом второго спуска.' },
        ],
      },
      {
        heading: 'Why Double Descent Matters in Practice',
        headingRu: 'Почему двойной спуск важен на практике',
        blocks: [
          { type: 'text', html: 'The <strong>Neural Tangent Kernel (NTK)</strong> provides a theoretical lens: in the infinite-width limit, neural networks behave like kernel machines, and double descent emerges naturally. This connects deep learning to classical kernel methods.', htmlRu: '<strong>Нейронный тангенциальный кернел (NTK)</strong> даёт теоретическую перспективу: в пределе бесконечной ширины нейронные сети ведут себя как кернел-машины, и двойной спуск возникает естественно. Это связывает глубокое обучение с классическими кернел-методами.' },
          { type: 'text', html: '<strong>Grokking</strong> is a related phenomenon: models trained on algorithmic tasks (e.g., modular arithmetic) suddenly generalize after extremely long training — well past the point of memorization. This suggests a phase transition in learning dynamics.', htmlRu: '<strong>Прозрение (grokking)</strong> — связанный феномен: модели, обученные на алгоритмических задачах (напр., модульная арифметика), внезапно обобщают после чрезвычайно долгого обучения — далеко за точкой запоминания. Это указывает на фазовый переход в динамике обучения.' },
          { type: 'info', variant: 'emerald', text: 'Practical takeaway: the "sweet spot" is not at the interpolation threshold. Either use a classically-sized model with explicit regularization, or go far beyond the threshold into the overparameterized regime where implicit regularization takes over.', textRu: 'Практический вывод: «оптимальная точка» не на пороге интерполяции. Используйте либо модель классического размера с явной регуляризацией, либо далеко за порогом в сверхпараметризованном режиме, где действует неявная регуляризация.' },
        ],
      },
    ],
    conclusion: 'Double descent reveals that our classical understanding of generalization is incomplete. Modern overparameterized models can achieve remarkable generalization despite perfectly fitting training data. Grokking and NTK theory deepen our understanding of why bigger models can generalize better.',
    conclusionRu: 'Двойной спуск показывает, что классическое понимание обобщения неполно. Современные сверхпараметризованные модели могут достигать замечательного обобщения, даже идеально подгоняя обучающие данные.',
    references: [
      { title: 'Deep Double Descent', authors: 'Nakkiran et al., 2019', url: 'https://arxiv.org/abs/1912.02292' },
    ],
  },

  /* ---- 14. Double Descent: Math ---- */
  {
    slug: 'double-descent-2',
    title: 'Double Descent: A Mathematical Explanation',
    titleRu: 'Двойной спуск: математическое объяснение',
    subtitle: 'Understanding the Mathematics Behind the Phenomenon',
    subtitleRu: 'Понимание математики за феноменом',
    authors: 'Jared Wilber',
    date: 'February 2024',
    thumbnail: `${BASE}/thumbnail-double-descent2.jpg`,
    sections: [
      {
        heading: 'The Cubic Spline Model',
        headingRu: 'Модель кубических сплайнов',
        blocks: [
          { type: 'text', html: 'Using <strong>cubic splines</strong> as a tractable model, we can derive the double descent curve analytically. The key insight is how the model\'s effective complexity changes near the interpolation threshold.', htmlRu: 'Используя <strong>кубические сплайны</strong> как трактативную модель, можно вывести кривую двойного спуска аналитически. Ключевой инсайт — как эффективная сложность модели меняется вблизи порога интерполяции.' },
          { type: 'formula', math: '\\hat{f}(x) = \\sum_{j=1}^{K} \\beta_j B_j(x)', label: 'Basis function expansion', labelRu: 'Разложение по базисным функциям' },
          { type: 'chart', chart: 'scatter', title: 'Cubic Spline Fitting at Varying Complexity', titleRu: 'Аппроксимация кубическими сплайнами при разной сложности', description: 'Watch the fit change as the number of basis functions increases', descriptionRu: 'Наблюдайте, как меняется подгонка при росте числа базисных функций', interactive: true },
        ],
      },
      {
        heading: 'The Role of Implicit Regularization',
        headingRu: 'Роль неявной регуляризации',
        blocks: [
          { type: 'text', html: 'In overparameterized settings, gradient descent acts as an <strong>implicit regularizer</strong>, selecting the minimum-norm solution among all interpolating functions.', htmlRu: 'В сверхпараметризованных настройках градиентный спуск действует как <strong>неявный регуляризатор</strong>, выбирая решение с минимальной нормой среди всех интерполирующих функций.' },
          { type: 'formula', math: '\\hat{\\beta} = X^T(XX^T)^{-1}y', label: 'Minimum-norm solution (p > n)', labelRu: 'Решение с минимальной нормой (p > n)' },
          { type: 'chart', chart: 'line', title: 'Risk Curve with Analytical Decomposition', titleRu: 'Кривая риска с аналитической декомпозицией', description: 'Bias, variance, and total risk across model complexity', descriptionRu: 'Смещение, дисперсия и полный риск по сложности модели', interactive: true },
        ],
      },
      {
        heading: 'Linear Model Analysis',
        headingRu: 'Анализ линейной модели',
        blocks: [
          { type: 'text', html: 'The simplest setting where double descent can be analyzed rigorously is <strong>ordinary least squares</strong> with random features. When p < n, there\'s a unique solution. When p > n, there are infinitely many solutions and gradient descent picks the minimum-norm one.', htmlRu: 'Простейшая постановка, где двойной спуск можно проанализировать строго — <strong>метод наименьших квадратов</strong> со случайными признаками. Когда p < n, решение единственно. Когда p > n, решений бесконечно много, и градиентный спуск выбирает решение с минимальной нормой.' },
          { type: 'formula', math: 'R(\hat{\beta}) = \sigma^2 \frac{p}{n-p} + \text{bias}^2 \quad (p < n) \quad \longrightarrow \quad R(\hat{\beta}) = \sigma^2 \frac{n}{p-n} + \text{bias}^2 \quad (p > n)', label: 'Risk in under- vs over-parameterized regimes', labelRu: 'Риск в недо- vs. сверхпараметризованном режимах' },
          { type: 'text', html: 'The variance <strong>explodes at p = n</strong> (the interpolation threshold) because the design matrix becomes singular. But as p grows beyond n, the variance <strong>decreases</strong> as the excess dimensions provide more flexibility for the minimum-norm solution.', htmlRu: 'Дисперсия <strong>взрывается при p = n</strong> (порог интерполяции), потому что матрица плана становится вырожденной. Но по мере роста p за пределы n дисперсия <strong>уменьшается</strong>, так как избыточные измерения обеспечивают больше гибкости для решения с минимальной нормой.' },
          { type: 'definition', title: 'Benign Overfitting', titleRu: 'Безобидное переобучение', math: '\text{Training error} = 0 \quad \text{but} \quad \text{Test error} \to \text{low value}', note: 'A model that perfectly fits (even memorizes) the training data can still generalize well if it lies in the overparameterized regime and uses implicit regularization.', noteRu: 'Модель, идеально подгоняющая (даже запоминающая) обучающие данные, всё равно может хорошо обобщать, если находится в сверхпараметризованном режиме и использует неявную регуляризацию.' },
          { type: 'info', variant: 'accent', text: 'Deep learning theory is still catching up with practice. The double descent phenomenon shows that classical statistical learning theory (VC dimension, Rademacher complexity) doesn\'t fully explain why overparameterized neural networks generalize.', textRu: 'Теория глубокого обучения всё ещё догоняет практику. Феномен двойного спуска показывает, что классическая статистическая теория обучения (VC-размерность, сложность Радемахера) не полностью объясняет, почему сверхпараметризованные нейронные сети обобщают.' },
        ],
      },
      {
        heading: 'Generalization Bounds & Modern Theory',
        headingRu: 'Границы обобщения и современная теория',
        blocks: [
          { type: 'text', html: '<strong>Uniform convergence</strong> bounds (Rademacher complexity, VC dimension) are too loose to explain deep learning generalization. <strong>Norm-based bounds</strong> (spectral norm, path norm) provide tighter guarantees that correlate with observed generalization.', htmlRu: 'Границы <strong>равномерной сходимости</strong> (сложность Радемахера, VC-размерность) слишком грубы для объяснения обобщения в глубоком обучении. <strong>Границы на основе норм</strong> (спектральная норма, путевая норма) дают более тесные гарантии, коррелирующие с наблюдаемым обобщением.' },
          { type: 'text', html: '<strong>Neural scaling laws</strong> empirically show that test loss follows a power law: \(L(N) \approx (N_c/N)^\alpha\) where N is model size. This predictability enables efficient resource allocation before full training.', htmlRu: '<strong>Нейронные законы масштабирования</strong> эмпирически показывают, что тестовая ошибка следует степенному закону: \(L(N) \approx (N_c/N)^\alpha\), где N — размер модели. Эта предсказуемость позволяет эффективно распределять ресурсы до полного обучения.' },
          { type: 'info', variant: 'emerald', text: 'Open questions: Why do some overparameterized models generalize while others memorize? The answer likely involves the interaction between architecture, optimization dynamics, and data structure — an active frontier of ML theory.', textRu: 'Открытые вопросы: почему одни сверхпараметризованные модели обобщают, а другие запоминают? Ответ, вероятно, связан с взаимодействием архитектуры, динамики оптимизации и структуры данных — активный фронт теории ML.' },
        ],
      },
    ],
    conclusion: 'The mathematical analysis of double descent reveals how implicit regularization in overparameterized models leads to good generalization. Scaling laws and norm-based bounds provide practical tools for predicting model behavior — a key insight for modern deep learning theory.',
    conclusionRu: 'Математический анализ двойного спуска раскрывает, как неявная регуляризация в сверхпараметризованных моделях приводит к хорошему обобщению — ключевой инсайт теории глубокого обучения.',
    references: [
      { title: 'Benign Overfitting in Linear Regression', authors: 'Bartlett et al., 2020', url: 'https://arxiv.org/abs/1906.11300' },
    ],
  },

  /* ---- 15. Convolutional Neural Networks ---- */
  {
    slug: 'cnn',
    title: 'Convolutional Neural Networks',
    titleRu: 'Свёрточные нейронные сети',
    subtitle: 'How Machines Learn to See — From Pixels to Patterns',
    subtitleRu: 'Как машины учатся видеть — от пикселей к паттернам',
    authors: 'Jared Wilber',
    date: 'March 2024',
    thumbnail: '/thumbnails/thumbnail-cnn.svg',
    sections: [
      {
        heading: 'The Convolution Operation',
        headingRu: 'Операция свёртки',
        blocks: [
          { type: 'text', html: 'A <strong>convolution</strong> slides a small filter (kernel) across an input image, computing a dot product at each position. This produces a <strong>feature map</strong> that highlights specific patterns — edges, textures, or shapes.', htmlRu: '<strong>Свёртка</strong> скользит малым фильтром (ядром) по входному изображению, вычисляя скалярное произведение в каждой позиции. Это создаёт <strong>карту признаков</strong>, выделяющую конкретные паттерны — границы, текстуры или формы.' },
          { type: 'formula', math: '(f * g)(t) = \\sum_{\\tau} f(\\tau) \\cdot g(t - \\tau)', label: 'Discrete convolution', labelRu: 'Дискретная свёртка' },
          { type: 'chart', chart: 'heatmap', title: 'Feature Map After Convolution', titleRu: 'Карта признаков после свёртки', description: 'Watch how a 3×3 edge-detection filter transforms the input', descriptionRu: 'Наблюдайте, как фильтр детекции границ 3×3 преобразует вход', interactive: true },
          { type: 'definition', title: 'Output Size', titleRu: 'Размер выхода', math: 'O = \\left\\lfloor \\frac{W - K + 2P}{S} \\right\\rfloor + 1', note: 'W = input size, K = kernel size, P = padding, S = stride', noteRu: 'W = размер входа, K = размер ядра, P = отступ, S = шаг' },
        ],
      },
      {
        heading: 'Pooling & Hierarchical Features',
        headingRu: 'Пулинг и иерархические признаки',
        blocks: [
          { type: 'text', html: '<strong>Max pooling</strong> downsamples feature maps by taking the maximum value in each window. This provides translation invariance and reduces computation.', htmlRu: '<strong>Макс-пулинг</strong> уменьшает карты признаков, беря максимальное значение в каждом окне. Это обеспечивает инвариантность к сдвигу и уменьшает вычисления.' },
          { type: 'formula', math: 'y_{i,j} = \\max_{(p,q) \\in R_{i,j}} x_{p,q}', label: 'Max pooling', labelRu: 'Макс-пулинг' },
          { type: 'chart', chart: 'architecture', title: 'CNN Architecture: LeNet-5', titleRu: 'Архитектура CNN: LeNet-5', description: 'Classic CNN: Conv → Pool → Conv → Pool → FC → Output', descriptionRu: 'Классическая CNN: свёртка → пулинг → свёртка → пулинг → полносвязный → выход', interactive: true },
          { type: 'info', variant: 'accent', text: 'Modern architectures like ResNet use skip connections to train networks with 100+ layers, solving the vanishing gradient problem in deep CNNs.', textRu: 'Современные архитектуры вроде ResNet используют skip-соединения для обучения сетей с 100+ слоями, решая проблему затухающих градиентов в глубоких CNN.' },
        ],
      },
      {
        heading: 'Training a CNN',
        headingRu: 'Обучение свёрточной сети',
        blocks: [
          { type: 'text', html: 'CNNs learn filters automatically through <strong>backpropagation</strong>. Early layers detect edges, middle layers detect shapes, and deep layers detect complex objects.', htmlRu: 'CNN обучают фильтры автоматически через <strong>обратное распространение</strong>. Ранние слои детектируют границы, средние — формы, глубокие — сложные объекты.' },
          { type: 'chart', chart: 'area', title: 'Training & Validation Loss', titleRu: 'Потеря на обучении и валидации', description: 'How a CNN learns to classify images over epochs', descriptionRu: 'Как CNN обучается классифицировать изображения по эпохам', interactive: true },
          { type: 'formula', math: '\\frac{\\partial L}{\\partial W_{ij}} = \\sum_m \\sum_n \\frac{\\partial L}{\\partial O_{mn}} \\cdot \\frac{\\partial O_{mn}}{\\partial W_{ij}}', label: 'Gradient w.r.t. weights', labelRu: 'Градиент по весам' },
          { type: 'info', variant: 'emerald', text: 'Data augmentation (rotation, flip, crop, color jitter) is essential for CNNs. It artificially expands the training set and teaches the network invariance to transformations.', textRu: 'Аугментация данных (поворот, отражение, обрезка, цветовые изменения) необходима для CNN. Она искусственно расширяет обучающую выборку и обучает сеть инвариантности к преобразованиям.' },
          { type: 'text', html: '<strong>Real-world applications</strong>: medical image analysis (detecting tumors in X-rays), self-driving cars (object detection), satellite imagery analysis, facial recognition, and industrial quality inspection.', htmlRu: '<strong>Реальные применения</strong>: анализ медицинских снимков (обнаружение опухолей на рентгене), беспилотные автомобили (детекция объектов), анализ спутниковых снимков, распознавание лиц и промышленный контроль качества.' },
        ],
      },
    ],
    conclusion: 'CNNs revolutionized computer vision and remain the backbone of image understanding systems — from medical imaging to self-driving cars. Their hierarchical feature learning mirrors how the visual cortex processes information.',
    conclusionRu: 'Свёрточные сети произвели революцию в компьютерном зрении и остаются основой систем распознавания изображений — от медицинской визуализации до беспилотных автомобилей. Их иерархическое обучение признаков повторяет работу зрительной коры.',
    references: [
      { title: 'Gradient-Based Learning Applied to Document Recognition', authors: 'LeCun et al., 1998', url: 'http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf' },
      { title: 'Deep Residual Learning for Image Recognition', authors: 'He et al., 2015', url: 'https://arxiv.org/abs/1512.03385' },
    ],
  },

  /* ---- 16. Recurrent Neural Networks & LSTMs ---- */
  {
    slug: 'rnn-lstm',
    title: 'RNNs & LSTMs',
    titleRu: 'RNN и LSTM',
    subtitle: 'Learning from Sequences — Memory in Neural Networks',
    subtitleRu: 'Обучение на последовательностях — память в нейросетях',
    authors: 'Jared Wilber',
    date: 'April 2024',
    thumbnail: '/thumbnails/thumbnail-rnn.svg',
    sections: [
      {
        heading: 'The Recurrence',
        headingRu: 'Рекуррентность',
        blocks: [
          { type: 'text', html: 'Recurrent Neural Networks process sequences one element at a time, maintaining a <strong>hidden state</strong> that acts as memory. At each timestep, the hidden state is updated using the current input and the previous state.', htmlRu: 'Рекуррентные нейронные сети обрабатывают последовательности по одному элементу, поддерживая <strong>скрытое состояние</strong>, выполняющее роль памяти. На каждом шаге скрытое состояние обновляется с использованием текущего входа и предыдущего состояния.' },
          { type: 'formula', math: 'h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)', label: 'RNN hidden state update', labelRu: 'Обновление скрытого состояния RNN' },
          { type: 'chart', chart: 'architecture', title: 'Unrolled RNN Over Time', titleRu: 'Развёрнутая RNN по времени', description: 'The recurrent connections unrolled across timesteps', descriptionRu: 'Рекуррентные соединения, развёрнутые по временным шагам', interactive: true },
          { type: 'text', html: 'While elegant, vanilla RNNs suffer from the <strong>vanishing gradient problem</strong> — gradients shrink exponentially as they propagate back through time, making long-range dependencies impossible to learn.', htmlRu: 'При всей элегантности обычные RNN страдают от проблемы <strong>затухающих градиентов</strong> — градиенты экспоненциально уменьшаются при распространении назад по времени, делая невозможным обучение долгосрочным зависимостям.' },
        ],
      },
      {
        heading: 'Long Short-Term Memory (LSTM)',
        headingRu: 'Долгая краткосрочная память (LSTM)',
        blocks: [
          { type: 'text', html: 'LSTMs solve the vanishing gradient problem using a <strong>cell state</strong> and three <strong>gates</strong> that control the flow of information.', htmlRu: 'LSTM решают проблему затухающих градиентов, используя <strong>состояние ячейки</strong> и три <strong>вентиля</strong>, контролирующих поток информации.' },
          { type: 'formula', math: 'f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)', label: 'Forget gate', labelRu: 'Вентиль забывания' },
          { type: 'formula', math: 'i_t = \\sigma(W_i \\cdot [h_{t-1}, x_t] + b_i), \\quad \\tilde{C}_t = \\tanh(W_C \\cdot [h_{t-1}, x_t] + b_C)', label: 'Input gate & candidate', labelRu: 'Входной вентиль и кандидат' },
          { type: 'formula', math: 'C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t', label: 'Cell state update', labelRu: 'Обновление состояния ячейки' },
          { type: 'formula', math: 'o_t = \\sigma(W_o \\cdot [h_{t-1}, x_t] + b_o), \\quad h_t = o_t \\odot \\tanh(C_t)', label: 'Output gate & hidden state', labelRu: 'Выходной вентиль и скрытое состояние' },
          { type: 'info', variant: 'emerald', text: 'The forget gate is the key innovation — it lets the LSTM selectively remember or discard information, enabling learning over hundreds of timesteps.', textRu: 'Вентиль забывания — ключевая инновация: он позволяет LSTM селективно запоминать или отбрасывать информацию, обеспечивая обучение на сотнях временных шагов.' },
        ],
      },
      {
        heading: 'Sequence Modeling in Practice',
        headingRu: 'Моделирование последовательностей на практике',
        blocks: [
          { type: 'chart', chart: 'line', title: 'Perplexity vs. Training Epochs', titleRu: 'Перплексия vs. эпохи обучения', description: 'How LSTM language models improve over time', descriptionRu: 'Как языковые модели LSTM улучшаются со временем', interactive: true },
          { type: 'chart', chart: 'area', title: 'Gradient Norm Over Timesteps', titleRu: 'Норма градиента по временным шагам', description: 'Comparing gradient flow: vanilla RNN vs. LSTM', descriptionRu: 'Сравнение потока градиентов: обычная RNN vs. LSTM', interactive: true },
          { type: 'text', html: '<strong>GRU (Gated Recurrent Unit)</strong> simplifies LSTM to two gates (reset and update), reducing parameters while maintaining similar performance. In practice, GRU and LSTM perform comparably on most tasks.', htmlRu: '<strong>GRU (Gated Recurrent Unit)</strong> упрощает LSTM до двух вентилей (сброс и обновление), уменьшая параметры при сохранении схожего качества. На практике GRU и LSTM показывают сопоставимые результаты на большинстве задач.' },
          { type: 'info', variant: 'accent', text: 'Applications of RNNs/LSTMs: machine translation (before Transformers), speech recognition, time-series forecasting, music generation, and handwriting recognition.', textRu: 'Применения RNN/LSTM: машинный перевод (до трансформеров), распознавание речи, прогнозирование временных рядов, генерация музыки и распознавание рукописного текста.' },
        ],
      },
    ],
    conclusion: 'LSTMs and their variants (GRUs, bidirectional LSTMs) were the dominant architecture for sequence modeling for over a decade. While Transformers have largely superseded them, understanding recurrence is fundamental to understanding sequential reasoning in modern models.',
    conclusionRu: 'LSTM и их варианты (GRU, двунаправленные LSTM) были доминирующей архитектурой для моделирования последовательностей более десяти лет. Хотя трансформеры в основном вытеснили их, понимание рекуррентности необходимо для понимания последовательного рассуждения в современных моделях.',
    references: [
      { title: 'Long Short-Term Memory', authors: 'Hochreiter & Schmidhuber, 1997', url: 'https://www.bioinf.jku.at/publications/older/2604.pdf' },
      { title: 'Understanding LSTM Networks', authors: 'Christopher Olah, 2015', url: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/' },
    ],
  },

  /* ---- 17. Generative Adversarial Networks ---- */
  {
    slug: 'gan',
    title: 'Generative Adversarial Networks',
    titleRu: 'Генеративно-состязательные сети',
    subtitle: 'Two Networks, One Game — Learning to Generate from Noise',
    subtitleRu: 'Две сети, одна игра — обучение генерации из шума',
    authors: 'Jared Wilber',
    date: 'May 2024',
    thumbnail: '/thumbnails/thumbnail-gan.svg',
    sections: [
      {
        heading: 'The Minimax Game',
        headingRu: 'Минимаксная игра',
        blocks: [
          { type: 'text', html: 'A GAN consists of two networks: a <strong>Generator</strong> G that creates fake data from noise, and a <strong>Discriminator</strong> D that tries to distinguish real from fake. They play a minimax game.', htmlRu: 'GAN состоит из двух сетей: <strong>генератора</strong> G, создающего фейковые данные из шума, и <strong>дискриминатора</strong> D, пытающегося отличить реальные от фейковых. Они играют минимаксную игру.' },
          { type: 'formula', math: '\\min_G \\max_D \\; V(D,G) = \\mathbb{E}_{x \\sim p_{data}}[\\log D(x)] + \\mathbb{E}_{z \\sim p_z}[\\log(1 - D(G(z)))]', label: 'GAN objective', labelRu: 'Целевая функция GAN' },
          { type: 'chart', chart: 'architecture', title: 'GAN Architecture', titleRu: 'Архитектура GAN', description: 'Generator creates fakes, Discriminator judges them', descriptionRu: 'Генератор создаёт фейки, дискриминатор их оценивает', interactive: true },
          { type: 'text', html: 'At the Nash equilibrium, the generator produces samples indistinguishable from real data, and the discriminator outputs 0.5 for all inputs.', htmlRu: 'В равновесии Нэша генератор создаёт образцы, неотличимые от реальных данных, а дискриминатор выдаёт 0.5 для всех входов.' },
        ],
      },
      {
        heading: 'Training Dynamics',
        headingRu: 'Динамика обучения',
        blocks: [
          { type: 'chart', chart: 'line', title: 'Generator vs. Discriminator Loss', titleRu: 'Потеря генератора vs. дискриминатора', description: 'The adversarial training dynamics over epochs', descriptionRu: 'Динамика состязательного обучения по эпохам', interactive: true },
          { type: 'formula', math: 'D_{KL}(p_{data} \\| p_g) = \\sum_x p_{data}(x) \\log \\frac{p_{data}(x)}{p_g(x)}', label: 'KL Divergence (mode collapse measure)', labelRu: 'KL-дивергенция (мера коллапса мод)' },
          { type: 'info', variant: 'amber', text: 'Mode collapse: when the generator learns to produce only a narrow set of outputs, ignoring the diversity of the real distribution. WGAN and spectral normalization help mitigate this.', textRu: 'Коллапс мод: когда генератор обучается выдавать только узкий набор выходов, игнорируя разнообразие реального распределения. WGAN и спектральная нормализация помогают это смягчить.' },
          { type: 'chart', chart: 'scatter', title: 'Generated Samples in Latent Space', titleRu: 'Сгенерированные образцы в латентном пространстве', description: 'How noise vectors map to generated outputs', descriptionRu: 'Как векторы шума отображаются в сгенерированные выходы', interactive: true },
          { type: 'text', html: '<strong>WGAN</strong> replaces the binary discriminator with a critic that estimates the Wasserstein distance, providing more stable training and better convergence signals.', htmlRu: '<strong>WGAN</strong> заменяет бинарный дискриминатор критиком, оценивающим расстояние Вассерштейна, обеспечивая более стабильное обучение и лучшие сигналы сходимости.' },
          { type: 'info', variant: 'emerald', text: 'Modern generative AI has largely moved from GANs to <strong>diffusion models</strong> (Stable Diffusion, DALL-E). Diffusion models train to denoise data iteratively, avoiding mode collapse entirely.', textRu: 'Современный генеративный ИИ в основном перешёл от GAN к <strong>диффузионным моделям</strong> (Stable Diffusion, DALL-E). Диффузионные модели обучаются итеративному удалению шума, полностью избегая коллапса мод.' },
        ],
      },
      {
        heading: 'GAN Architectures & Legacy',
        headingRu: 'Архитектуры GAN и наследие',
        blocks: [
          { type: 'text', html: '<strong>StyleGAN</strong> introduced style-based generation with mapping network + adaptive instance normalization, enabling unprecedented control over generated faces. <strong>CycleGAN</strong> learns bidirectional mappings between domains without paired data (e.g., horses ↔ zebras). <strong>Pix2Pix</strong> handles paired image-to-image translation.', htmlRu: '<strong>StyleGAN</strong> представил генерацию на основе стилей с mapping-сетью + адаптивной нормализацией, обеспечив беспрецедентный контроль над генерируемыми лицами. <strong>CycleGAN</strong> обучает двунаправленные отображения между доменами без парных данных (напр., лошади ↔ зебры). <strong>Pix2Pix</strong> решает парный перевод изображений.' },
          { type: 'formula', math: 'L_{\text{CycleGAN}} = L_{\text{adv}}(G, D_Y) + L_{\text{adv}}(F, D_X) + \lambda \cdot L_{\text{cycle}}(G, F)', label: 'CycleGAN: adversarial + cycle consistency loss', labelRu: 'CycleGAN: состязательная + цикл-консистентная потеря' },
          { type: 'text', html: 'GANs\' legacy extends beyond image generation: the <strong>adversarial training paradigm</strong> underlies RLHF (reward model as discriminator), adversarial robustness, and AI safety research. <strong>FID</strong> (Frechet Inception Distance) remains the standard metric for evaluating generative image quality.', htmlRu: 'Наследие GAN выходит за рамки генерации изображений: <strong>парадигма состязательного обучения</strong> лежит в основе RLHF (модель награды как дискриминатор), состязательной устойчивости и исследований безопасности ИИ. <strong>FID</strong> (расстояние Фреше-Инсепшн) остаётся стандартной метрикой оценки качества генеративных изображений.' },
          { type: 'info', variant: 'amber', text: 'Despite being overtaken by diffusion models, GANs remain relevant for real-time generation (low latency), video synthesis, and adversarial training concepts that permeate modern AI safety.', textRu: 'Несмотря на вытеснение диффузионными моделями, GAN остаются актуальными для генерации в реальном времени (низкая задержка), синтеза видео и концепций состязательного обучения, пронизывающих современную безопасность ИИ.' },
        ],
      },
    ],
    conclusion: 'GANs sparked a revolution in generative AI — from StyleGAN faces to CycleGAN style transfer. Though diffusion models have overtaken them for image generation, the adversarial training paradigm remains influential in RLHF, AI safety, and real-time generation applications.',
    conclusionRu: 'GAN запустили революцию в генеративном ИИ — от лиц StyleGAN до переноса стиля CycleGAN. Хотя диффузионные модели обогнали их в генерации изображений, парадигма состязательного обучения остаётся влиятельной в RLHF и безопасности ИИ.',
    references: [
      { title: 'Generative Adversarial Nets', authors: 'Goodfellow et al., 2014', url: 'https://arxiv.org/abs/1406.2661' },
      { title: 'A Style-Based Generator Architecture for GANs', authors: 'Karras et al., 2018', url: 'https://arxiv.org/abs/1812.04948' },
    ],
  },

  /* ---- 18. Transformers & Self-Attention ---- */
  {
    slug: 'transformer',
    title: 'Transformers & Self-Attention',
    titleRu: 'Трансформеры и самовнимание',
    subtitle: 'The Architecture Behind GPT, BERT, and Modern AI',
    subtitleRu: 'Архитектура за GPT, BERT и современным ИИ',
    authors: 'Jared Wilber',
    date: 'June 2024',
    thumbnail: '/thumbnails/thumbnail-transformer.svg',
    sections: [
      {
        heading: 'Scaled Dot-Product Attention',
        headingRu: 'Масштабированное внимание (dot-product)',
        blocks: [
          { type: 'text', html: 'The <strong>self-attention mechanism</strong> allows each token to attend to every other token in the sequence. Queries, Keys, and Values are computed via linear projections.', htmlRu: 'Механизм <strong>самовнимания</strong> позволяет каждому токену обращаться к каждому другому токену в последовательности. Запросы, Ключи и Значения вычисляются через линейные проекции.' },
          { type: 'formula', math: '\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V', label: 'Scaled dot-product attention', labelRu: 'Масштабированное внимание (dot-product)' },
          { type: 'chart', chart: 'heatmap', title: 'Self-Attention Weights', titleRu: 'Веса самовнимания', description: 'Which tokens attend to which — the attention pattern', descriptionRu: 'Какие токены к каким обращаются — паттерн внимания', interactive: true },
          { type: 'definition', title: 'Multi-Head Attention', titleRu: 'Мультиголовочное внимание', math: '\\text{MultiHead}(Q,K,V) = \\text{Concat}(head_1, \\ldots, head_h) W^O', note: 'Each head learns different attention patterns — syntax, semantics, position.', noteRu: 'Каждая голова обучает разные паттерны внимания — синтаксис, семантику, позицию.' },
        ],
      },
      {
        heading: 'The Full Transformer Block',
        headingRu: 'Полный блок трансформера',
        blocks: [
          { type: 'text', html: 'A Transformer block consists of <strong>multi-head self-attention</strong> followed by a <strong>feed-forward network</strong>, with <strong>layer normalization</strong> and <strong>residual connections</strong>.', htmlRu: 'Блок трансформера состоит из <strong>мультиголовочного самовнимания</strong>, за которым следует <strong>полносвязная сеть</strong>, с <strong>нормализацией слоёв</strong> и <strong>остаточными соединениями</strong>.' },
          { type: 'formula', math: '\\text{FFN}(x) = \\max(0, xW_1 + b_1)W_2 + b_2', label: 'Feed-forward network (GeLU in practice)', labelRu: 'Полносвязная сеть (на практике GeLU)' },
          { type: 'formula', math: '\\text{LayerNorm}(x) = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} \\cdot \\gamma + \\beta', label: 'Layer normalization', labelRu: 'Нормализация слоёв' },
          { type: 'chart', chart: 'architecture', title: 'Transformer Encoder-Decoder Architecture', titleRu: 'Архитектура энкодер-декодер трансформера', description: 'The full "Attention Is All You Need" architecture', descriptionRu: 'Полная архитектура «Attention Is All You Need»', interactive: true },
        ],
      },
      {
        heading: 'Positional Encoding & Scaling',
        headingRu: 'Позиционное кодирование и масштабирование',
        blocks: [
          { type: 'text', html: 'Unlike RNNs, Transformers have no inherent notion of order. <strong>Positional encodings</strong> inject sequence position information into the embeddings.', htmlRu: 'В отличие от RNN, трансформеры не имеют встроенного понятия порядка. <strong>Позиционные кодирования</strong> вводят информацию о позиции последовательности в эмбеддинги.' },
          { type: 'formula', math: 'PE_{(pos, 2i)} = \\sin\\!\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right), \\quad PE_{(pos, 2i+1)} = \\cos\\!\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)', label: 'Sinusoidal positional encoding', labelRu: 'Синусоидальное позиционное кодирование' },
          { type: 'chart', chart: 'line', title: 'Model Performance vs. Scale', titleRu: 'Качество модели vs. масштаб', description: 'How Transformer performance scales with parameters and data', descriptionRu: 'Как качество трансформера масштабируется с параметрами и данными', interactive: true },
          { type: 'info', variant: 'accent', text: 'Scaling laws: performance improves predictably as a power law of model size, dataset size, and compute budget — the foundation of the "bigger is better" paradigm.', textRu: 'Законы масштабирования: качество предсказуемо улучшается как степенная функция размера модели, объёма данных и вычислительного бюджета — основа парадигмы «больше = лучше».' },
          { type: 'text', html: '<strong>Modern Transformer variants</strong>: GPT (decoder-only, autoregressive), BERT (encoder-only, masked LM), T5 (encoder-decoder, text-to-text). Most current LLMs use the decoder-only architecture.', htmlRu: '<strong>Современные варианты трансформеров</strong>: GPT (только декодер, авторегрессионный), BERT (только энкодер, маскированный LM), T5 (энкодер-декодер, текст-в-текст). Большинство современных LLM используют архитектуру только с декодером.' },
          { type: 'definition', title: 'KV Cache (Inference)', titleRu: 'KV-кэш (инференс)', math: 'O(N^2d) \\to O(Nd) \\text{ per token}', note: 'Pre-computing Key-Value pairs for past tokens avoids redundant computation during autoregressive generation.', noteRu: 'Предвычисление пар Ключ-Значение для прошлых токенов avoids избыточные вычисления при авторегрессионной генерации.' },
        ],
      },
    ],
    conclusion: 'The Transformer architecture is the foundation of modern AI — powering GPT-4, Claude, Gemini, and virtually every state-of-the-art model. Its parallelizable self-attention mechanism made training on massive datasets feasible, ushering in the era of large language models.',
    conclusionRu: 'Архитектура трансформера — основа современного ИИ, обеспечивающая GPT-4, Claude, Gemini и практически все передовые модели. Её параллелизуемый механизм самовнимания сделал возможным обучение на огромных наборах данных, открыв эру больших языковых моделей.',
    references: [
      { title: 'Attention Is All You Need', authors: 'Vaswani et al., 2017', url: 'https://arxiv.org/abs/1706.03762' },
      { title: 'Scaling Laws for Neural Language Models', authors: 'Kaplan et al., 2020', url: 'https://arxiv.org/abs/2001.08361' },
    ],
  },

  /* ---- 19. Autoencoders & VAEs ---- */
  {
    slug: 'autoencoder',
    title: 'Autoencoders & VAEs',
    titleRu: 'Автоэнкодеры и VAE',
    subtitle: 'Learning Compressed Representations of Data',
    subtitleRu: 'Обучение сжатых представлений данных',
    authors: 'Jared Wilber',
    date: 'July 2024',
    thumbnail: '/thumbnails/thumbnail-autoencoder.svg',
    sections: [
      {
        heading: 'The Encoder-Decoder Framework',
        headingRu: 'Архитектура энкодер-декодер',
        blocks: [
          { type: 'text', html: 'An <strong>autoencoder</strong> learns to compress input data into a low-dimensional <strong>latent representation</strong>, then reconstruct it. The bottleneck forces the network to learn efficient encodings.', htmlRu: '<strong>Автоэнкодер</strong> обучается сжимать входные данные в низкоразмерное <strong>латентное представление</strong>, а затем восстанавливать их. Узкое место заставляет сеть обучать эффективные кодирования.' },
          { type: 'formula', math: 'z = f_{enc}(x), \\quad \\hat{x} = f_{dec}(z), \\quad L = \\|x - \\hat{x}\\|^2', label: 'Encode → Decode → Reconstruction loss', labelRu: 'Кодирование → Декодирование → Потеря реконструкции' },
          { type: 'chart', chart: 'architecture', title: 'Autoencoder Architecture', titleRu: 'Архитектура автоэнкодера', description: 'Encoder compresses, Decoder reconstructs', descriptionRu: 'Энкодер сжимает, декодер восстанавливает', interactive: true },
        ],
      },
      {
        heading: 'Variational Autoencoders (VAE)',
        headingRu: 'Вариационные автоэнкодеры (VAE)',
        blocks: [
          { type: 'text', html: 'VAEs add a probabilistic twist: the encoder outputs a <strong>distribution</strong> (mean and variance) rather than a fixed vector. The <strong>reparameterization trick</strong> enables backpropagation through sampling.', htmlRu: 'VAE добавляют вероятностный поворот: энкодер выдаёт <strong>распределение</strong> (среднее и дисперсию), а не фиксированный вектор. <strong>Трюк репараметризации</strong> обеспечивает обратное распространение через сэмплирование.' },
          { type: 'formula', math: 'z = \\mu + \\sigma \\odot \\epsilon, \\quad \\epsilon \\sim \\mathcal{N}(0, I)', label: 'Reparameterization trick', labelRu: 'Трюк репараметризации' },
          { type: 'formula', math: 'L_{VAE} = \\underbrace{-\\mathbb{E}_{q(z|x)}[\\log p(x|z)]}_{\\text{reconstruction}} + \\underbrace{D_{KL}(q(z|x) \\| p(z))}_{\\text{regularization}}', label: 'ELBO loss', labelRu: 'Потеря ELBO' },
          { type: 'chart', chart: 'scatter', title: 'VAE Latent Space', titleRu: 'Латентное пространство VAE', description: 'How data points cluster in the learned 2D latent space', descriptionRu: 'Как точки данных кластеризуются в обученном 2D латентном пространстве', interactive: true },
          { type: 'info', variant: 'emerald', text: 'The KL divergence term acts as a regularizer, pushing the latent distribution toward a standard normal — enabling smooth interpolation and generation.', textRu: 'KL-дивергенция действует как регуляризатор, подтягивая латентное распределение к стандартному нормальному — обеспечивая плавную интерполяцию и генерацию.' },
          { type: 'text', html: '<strong>VQ-VAE</strong> (Vector Quantized VAE) uses a discrete latent space with a codebook, producing sharper reconstructions. It powers many modern image and audio generation models.', htmlRu: '<strong>VQ-VAE</strong> (векторно-квантованный VAE) использует дискретное латентное пространство с таблицей кодов, давая более чёткие реконструкции. Он лежит в основе многих современных моделей генерации изображений и аудио.' },
        ],
      },
      {
        heading: 'Denoising Autoencoders & Applications',
        headingRu: 'Шумоподавляющие автоэнкодеры и применения',
        blocks: [
          { type: 'text', html: '<strong>Denoising autoencoders</strong> corrupt the input with noise (Gaussian, masking, dropout) and learn to reconstruct the clean version. This forces the encoder to learn robust features rather than memorizing the input.', htmlRu: '<strong>Шумоподавляющие автоэнкодеры</strong> искажают вход шумом (гауссовский, маскирование, dropout) и учатся реконструировать чистую версию. Это заставляет энкодер обучать устойчивые признаки, а не запоминать вход.' },
          { type: 'formula', math: '\min_{\theta,\phi} \mathbb{E}_{x \sim D, \tilde{x} \sim q(\tilde{x}|x)} \left[\|x - f_\phi(g_\theta(\tilde{x}))\|^2\right]', label: 'Denoising autoencoder objective', labelRu: 'Целевая функция шумоподавляющего автоэнкодера' },
          { type: 'info', variant: 'emerald', text: 'Applications: anomaly detection (high reconstruction error = anomaly), dimensionality reduction (bottleneck features as input to downstream models), image inpainting, and pretraining for classification.', textRu: 'Применения: детекция аномалий (высокая ошибка реконструкции = аномалия), снижение размерности (признаки бутылочного горлышка для нижестоящих моделей), заполнение пропусков изображений и предобучение для классификации.' },
        ],
      },
    ],
    conclusion: 'Autoencoders and VAEs are foundational to representation learning. VAEs in particular laid the groundwork for modern generative models, and their latent space interpretation remains a powerful tool for understanding learned representations. Denoising autoencoders provide robust feature extraction.',
    conclusionRu: 'Автоэнкодеры и VAE — основа обучения представлений. VAE, в частности, заложили фундамент современных генеративных моделей, а интерпретация их латентного пространства остаётся мощным инструментом анализа. Шумоподавляющие автоэнкодеры обеспечивают надёжное извлечение признаков.',
    references: [
      { title: 'Auto-Encoding Variational Bayes', authors: 'Kingma & Welling, 2013', url: 'https://arxiv.org/abs/1312.6114' },
    ],
  },

  /* ---- 20. Attention Mechanism Deep Dive ---- */
  {
    slug: 'attention',
    title: 'Attention Mechanisms',
    titleRu: 'Механизмы внимания',
    subtitle: 'From Bahdanau to Multi-Head — How Models Focus',
    subtitleRu: 'От Бахданау до мультиголовочного внимания — как модели фокусируются',
    authors: 'Jared Wilber',
    date: 'August 2024',
    thumbnail: '/thumbnails/thumbnail-attention.svg',
    sections: [
      {
        heading: 'Additive (Bahdanau) Attention',
        headingRu: 'Аддитивное внимание (Бахданау)',
        blocks: [
          { type: 'text', html: 'The original attention mechanism computes alignment scores between a decoder state and each encoder hidden state, producing a <strong>context vector</strong> as a weighted sum.', htmlRu: 'Оригинальный механизм внимания вычисляет оценки выравнивания между состоянием декодера и каждым скрытым состоянием энкодера, создавая <strong>контекстный вектор</strong> как взвешенную сумму.' },
          { type: 'formula', math: 'e_{ij} = a(s_{i-1}, h_j), \\quad \\alpha_{ij} = \\frac{\\exp(e_{ij})}{\\sum_k \\exp(e_{ik})}, \\quad c_i = \\sum_j \\alpha_{ij} h_j', label: 'Bahdanau attention', labelRu: 'Внимание Бахданау' },
          { type: 'chart', chart: 'heatmap', title: 'Attention Alignment Matrix', titleRu: 'Матрица выравнивания внимания', description: 'How decoder tokens attend to encoder tokens in translation', descriptionRu: 'Как токены декодера обращаются к токенам энкодера при переводе', interactive: true },
        ],
      },
      {
        heading: 'Attention Variants',
        headingRu: 'Варианты внимания',
        blocks: [
          { type: 'text', html: '<strong>Luong attention</strong> simplifies the score function to a dot product. <strong>Cross-attention</strong> lets one sequence attend to another. <strong>Causal (masked) attention</strong> prevents attending to future tokens — essential for autoregressive generation.', htmlRu: '<strong>Внимание Луонга</strong> упрощает функцию оценки до скалярного произведения. <strong>Перекрёстное внимание</strong> позволяет одной последовательности обращаться к другой. <strong>Каузальное (маскированное) внимание</strong> предотвращает обращение к будущим токенам — необходимо для авторегрессионной генерации.' },
          { type: 'formula', math: '\\text{score}(Q, K) = \\begin{cases} QK^T / \\sqrt{d_k} & \\text{dot-product} \\\\ v^T \\tanh(W_1 Q + W_2 K) & \\text{additive} \\end{cases}', label: 'Attention score functions', labelRu: 'Функции оценки внимания' },
          { type: 'chart', chart: 'line', title: 'Attention Entropy Over Layers', titleRu: 'Энтропия внимания по слоям', description: 'How attention becomes more focused in deeper layers', descriptionRu: 'Как внимание становится более фокусированным в глубоких слоях', interactive: true },
          { type: 'info', variant: 'accent', text: 'Flash Attention: an algorithm that computes exact attention with IO-awareness, reducing memory from O(N²) to O(N) — enabling 100K+ context windows.', textRu: 'Flash Attention: алгоритм вычисления точного внимания с учётом IO, уменьшающий память с O(N²) до O(N) — обеспечивает контекстные окна 100K+.' },
          { type: 'text', html: '<strong>Grouped Query Attention (GQA)</strong> and <strong>Multi-Query Attention (MQA)</strong> reduce KV cache memory by sharing fewer key/value heads across query heads — essential for efficient LLM inference.', htmlRu: '<strong>Grouped Query Attention (GQA)</strong> и <strong>Multi-Query Attention (MQA)</strong> уменьшают память KV-кэша, разделяя меньше голов ключей/значений между головами запросов — необходимо для эффективного инференса LLM.' },
          { type: 'definition', title: 'Sparse Attention', titleRu: 'Разреженное внимание', math: '\text{Attention}(Q,K,V) = \text{softmax}\!\left(\frac{QK^T_{\text{top-k}}}{\sqrt{d_k}}\right) V', note: 'Only attend to the top-k most relevant keys. Reduces O(N²) to O(Nk), enabling longer sequences.', noteRu: 'Обращение только к top-k наиболее релевантным ключам. Уменьшает O(N²) до O(Nk), обеспечивая более длинные последовательности.' },
        ],
      },
      {
        heading: 'Positional Encoding & Modern Architectures',
        headingRu: 'Позиционное кодирование и современные архитектуры',
        blocks: [
          { type: 'text', html: 'Attention is <strong>permutation-invariant</strong> — it has no notion of token order. <strong>Positional encodings</strong> inject position information: sinusoidal (original Transformer), learned embeddings (BERT), or <strong>rotary position embeddings (RoPE)</strong> used in LLaMA and GPT-NeoX.', htmlRu: 'Внимание <strong>инвариантно к перестановкам</strong> — у него нет понятия порядка токенов. <strong>Позиционные кодирования</strong> вносят информацию о позиции: синусоидальные (оригинальный Transformer), обучаемые эмбеддинги (BERT) или <strong>ротационные позиционные эмбеддинги (RoPE)</strong> в LLaMA и GPT-NeoX.' },
          { type: 'formula', math: 'PE_{(pos, 2i)} = \sin\!\left(\frac{pos}{10000^{2i/d}}\right), \quad PE_{(pos, 2i+1)} = \cos\!\left(\frac{pos}{10000^{2i/d}}\right)', label: 'Sinusoidal positional encoding', labelRu: 'Синусоидальное позиционное кодирование' },
          { type: 'info', variant: 'emerald', text: 'ALiBi (Attention with Linear Biases) adds a fixed distance-based bias to attention scores instead of positional embeddings — enabling length extrapolation beyond training context.', textRu: 'ALiBi (внимание с линейными смещениями) добавляет фиксированное смещение на основе расстояния к оценкам внимания вместо позиционных эмбеддингов — обеспечивая экстраполяцию длины за пределы обучающего контекста.' },
        ],
      },
    ],
    conclusion: 'Attention is the key innovation that made Transformers possible. Understanding the evolution from additive to multi-head attention, along with positional encoding strategies, reveals how modern models process and reason about sequential information.',
    conclusionRu: 'Внимание — ключевая инновация, сделавшая трансформеры возможными. Понимание эволюции от аддитивного до мультиголовочного внимания вместе со стратегиями позиционного кодирования раскрывает, как современные модели обрабатывают последовательную информацию.',
    references: [
      { title: 'Neural Machine Translation by Jointly Learning to Align and Translate', authors: 'Bahdanau et al., 2014', url: 'https://arxiv.org/abs/1409.0473' },
      { title: 'FlashAttention: Fast and Memory-Efficient Attention', authors: 'Dao et al., 2022', url: 'https://arxiv.org/abs/2205.14135' },
    ],
  },

  /* ---- 21. Batch Normalization ---- */
  {
    slug: 'batch-norm',
    title: 'Batch Normalization',
    titleRu: 'Пакетная нормализация',
    subtitle: 'Stabilizing and Accelerating Deep Network Training',
    subtitleRu: 'Стабилизация и ускорение обучения глубоких сетей',
    authors: 'Jared Wilber',
    date: 'September 2024',
    thumbnail: '/thumbnails/thumbnail-batchnorm.svg',
    sections: [
      {
        heading: 'Internal Covariate Shift',
        headingRu: 'Внутренний ковариативный сдвиг',
        blocks: [
          { type: 'text', html: 'As a deep network trains, the distribution of inputs to each layer changes — this <strong>internal covariate shift</strong> slows training. Batch Normalization fixes this by normalizing layer inputs.', htmlRu: 'По мере обучения глубокой сети распределение входов каждого слоя меняется — этот <strong>внутренний ковариативный сдвиг</strong> замедляет обучение. Пакетная нормализация решает это, нормализуя входы слоёв.' },
          { type: 'formula', math: '\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}, \\quad y_i = \\gamma \\hat{x}_i + \\beta', label: 'Batch normalization', labelRu: 'Пакетная нормализация' },
          { type: 'definition', title: 'Running Statistics (Inference)', titleRu: 'Накопленные статистики (инференс)', math: '\\mu_{running} = \\alpha \\mu_B + (1-\\alpha)\\mu_{running}', note: 'At inference, use running mean/variance instead of batch statistics.', noteRu: 'При инференсе используйте накопленные среднее/дисперсию вместо статистик батча.' },
        ],
      },
      {
        heading: 'Effects on Training',
        headingRu: 'Влияние на обучение',
        blocks: [
          { type: 'chart', chart: 'line', title: 'Training Loss: With vs. Without BatchNorm', titleRu: 'Потеря обучения: с BatchNorm vs. без', description: 'How BatchNorm accelerates convergence', descriptionRu: 'Как BatchNorm ускоряет сходимость', interactive: true },
          { type: 'chart', chart: 'area', title: 'Activation Distribution Across Layers', titleRu: 'Распределение активаций по слоям', description: 'How BatchNorm keeps activations well-distributed', descriptionRu: 'Как BatchNorm поддерживает хорошее распределение активаций', interactive: true },
          { type: 'info', variant: 'emerald', text: 'BatchNorm allows higher learning rates, acts as a mild regularizer, and reduces sensitivity to initialization — making deep network training far more robust.', textRu: 'BatchNorm позволяет использовать более высокие темпы обучения, действует как мягкий регуляризатор и снижает чувствительность к инициализации — делая обучение глубоких сетей значительно более надёжным.' },
          { type: 'text', html: '<strong>Group Normalization</strong> divides channels into groups and normalizes within each group — independent of batch size. Essential for object detection and segmentation tasks where batch sizes are small.', htmlRu: '<strong>Групповая нормализация</strong> делит каналы на группы и нормализует внутри каждой группы — независимо от размера батча. Необходима для задач детекции объектов и сегментации, где батчи малы.' },
          { type: 'text', html: 'In <strong>Transformers</strong>, LayerNorm is applied before each sublayer (Pre-LN) or after (Post-LN). Pre-LN is now standard as it provides more stable gradients in deep Transformers.', htmlRu: 'В <strong>трансформерах</strong> LayerNorm применяется перед каждым подслоём (Pre-LN) или после (Post-LN). Pre-LN теперь стандартен, так как обеспечивает более стабильные градиенты в глубоких трансформерах.' },
          { type: 'formula', math: '\\text{LayerNorm}(x) = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} \\gamma + \\beta \\quad \\text{(per-sample, not per-batch)}', label: 'Layer Normalization (for Transformers)', labelRu: 'Layer Normalization (для трансформеров)' },
        ],
      },
      {
        heading: 'Normalization Variants & Best Practices',
        headingRu: 'Варианты нормализации и лучшие практики',
        blocks: [
          { type: 'text', html: '<strong>Instance Normalization</strong> normalizes per-sample per-channel — standard in style transfer (AdaIN). <strong>RMSNorm</strong> simplifies LayerNorm by removing the mean subtraction, used in LLaMA and modern LLMs for computational efficiency.', htmlRu: '<strong>Instance Normalization</strong> нормализует по каждому примеру и каналу — стандарт в переносе стиля (AdaIN). <strong>RMSNorm</strong> упрощает LayerNorm, убирая вычитание среднего, используется в LLaMA и современных LLM для вычислительной эффективности.' },
          { type: 'formula', math: '\\text{RMSNorm}(x) = \\frac{x}{\\text{RMS}(x)} \\gamma, \\quad \\text{RMS}(x) = \\sqrt{\\frac{1}{d}\\sum_{i=1}^d x_i^2}', label: 'RMS Normalization', labelRu: 'RMS-нормализация' },
          { type: 'info', variant: 'accent', text: 'Rule of thumb: BatchNorm for CNNs (large batches), LayerNorm/RMSNorm for Transformers (sequence models), GroupNorm for object detection (small batches), InstanceNorm for style transfer.', textRu: 'Практическое правило: BatchNorm для CNN (большие батчи), LayerNorm/RMSNorm для трансформеров (последовательности), GroupNorm для детекции объектов (малые батчи), InstanceNorm для переноса стиля.' },
        ],
      },
    ],
    conclusion: 'Batch Normalization is one of the most impactful innovations in deep learning. While Layer Norm and RMSNorm have become standard for Transformers, BatchNorm remains essential for CNNs. The choice of normalization depends on architecture, batch size, and task.',
    conclusionRu: 'Пакетная нормализация — одна из самых влиятельных инноваций в глубоком обучении. Хотя LayerNorm и RMSNorm стали стандартом для трансформеров, BatchNorm остаётся незаменимым для CNN. Выбор нормализации зависит от архитектуры, размера батча и задачи.',
    references: [
      { title: 'Batch Normalization: Accelerating Deep Network Training', authors: 'Ioffe & Szegedy, 2015', url: 'https://arxiv.org/abs/1502.03167' },
    ],
  },

  /* ---- 22. Dropout & Regularization ---- */
  {
    slug: 'dropout',
    title: 'Dropout & Regularization',
    titleRu: 'Dropout и регуляризация',
    subtitle: 'Preventing Overfitting in Deep Neural Networks',
    subtitleRu: 'Предотвращение переобучения в глубоких нейросетях',
    authors: 'Jared Wilber',
    date: 'October 2024',
    thumbnail: '/thumbnails/thumbnail-dropout.svg',
    sections: [
      {
        heading: 'The Dropout Mechanism',
        headingRu: 'Механизм dropout',
        blocks: [
          { type: 'text', html: '<strong>Dropout</strong> randomly zeroes a fraction of neuron outputs during training. This prevents co-adaptation and forces the network to learn robust, distributed representations.', htmlRu: '<strong>Dropout</strong> случайным образом обнуляет часть выходов нейронов при обучении. Это предотвращает ко-адаптацию и заставляет сеть обучать надёжные распределённые представления.' },
          { type: 'formula', math: '\\hat{h}_i = r_i \\cdot h_i, \\quad r_i \\sim \\text{Bernoulli}(p)', label: 'Dropout mask', labelRu: 'Маска dropout' },
          { type: 'formula', math: 'h_{test} = p \\cdot h_{train} \\quad \\text{(inverted dropout: scale at train time)}', label: 'Inverted dropout scaling', labelRu: 'Инвертированное масштабирование dropout' },
          { type: 'chart', chart: 'line', title: 'Train vs. Test Accuracy: With vs. Without Dropout', titleRu: 'Точность обучения vs. теста: с Dropout vs. без', description: 'How dropout prevents overfitting', descriptionRu: 'Как dropout предотвращает переобучение', interactive: true },
        ],
      },
      {
        heading: 'Regularization Techniques',
        headingRu: 'Методы регуляризации',
        blocks: [
          { type: 'text', html: 'Beyond dropout, deep learning uses <strong>L2 weight decay</strong>, <strong>data augmentation</strong>, <strong>early stopping</strong>, and <strong>label smoothing</strong> to combat overfitting.', htmlRu: 'Помимо dropout, глубокое обучение использует <strong>L2 weight decay</strong>, <strong>аугментацию данных</strong>, <strong>раннюю остановку</strong> и <strong>сглаживание меток</strong> для борьбы с переобучением.' },
          { type: 'formula', math: 'L_{reg} = L + \\frac{\\lambda}{2} \\|w\\|^2', label: 'L2 regularization (weight decay)', labelRu: 'L2-регуляризация (weight decay)' },
          { type: 'chart', chart: 'area', title: 'Effect of Dropout Rate on Generalization', titleRu: 'Влияние dropout на обобщение', description: 'Finding the optimal dropout probability', descriptionRu: 'Поиск оптимальной вероятности dropout', interactive: true },
          { type: 'info', variant: 'amber', text: 'Dropout at 0.5 is standard for fully-connected layers. For conv layers, 0.2–0.3 is typical. Too much dropout underfits; too little fails to regularize.', textRu: 'Dropout 0.5 — стандарт для полносвязных слоёв. Для свёрточных слоёв типично 0.2–0.3. Слишком большой dropout недообучает; слишком малый не обеспечивает регуляризацию.' },
          { type: 'text', html: '<strong>DropConnect</strong> zeroes random weights instead of activations. <strong>Spatial dropout</strong> drops entire feature maps in CNNs, preserving spatial consistency.', htmlRu: '<strong>DropConnect</strong> обнуляет случайные веса вместо активаций. <strong>Пространственный dropout</strong> отключает целые карты признаков в CNN, сохраняя пространственную согласованность.' },
          { type: 'definition', title: 'Stochastic Depth', titleRu: 'Стохастическая глубина', math: 'h_l = h_{l-1} + p_l \cdot F(h_{l-1}), \quad p_l \sim \text{Bernoulli}(1 - \frac{l}{L}(1-p_L))', note: 'Randomly skip entire layers during training. Deeper layers are dropped more often. Used in EfficientNet and modern architectures.', noteRu: 'Случайно пропускайте целые слои при обучении. Более глубокие слои отключаются чаще. Используется в EfficientNet и современных архитектурах.' },
        ],
      },
      {
        heading: 'Dropout in Modern Architectures',
        headingRu: 'Dropout в современных архитектурах',
        blocks: [
          { type: 'text', html: 'In <strong>Transformers</strong>, dropout is applied to attention weights and feed-forward layers. <strong>Attention dropout</strong> randomly zeros attention scores, forcing the model to distribute information across multiple heads. This improves robustness and prevents memorization of specific attention patterns.', htmlRu: 'В <strong>трансформерах</strong> dropout применяется к весам внимания и полносвязным слоям. <strong>Attention dropout</strong> случайно обнуляет оценки внимания, заставляя модель распределять информацию по нескольким головам. Это улучшает надёжность и предотвращает запоминание конкретных паттернов внимания.' },
          { type: 'text', html: '<strong>Data augmentation</strong> is the most powerful regularizer for vision: MixUp blends random image pairs, CutMix replaces regions with patches from other images, and RandAugment applies random transformations. These often outperform dropout alone for CNNs.', htmlRu: '<strong>Аугментация данных</strong> — самый мощный регуляризатор для компьютерного зрения: MixUp смешивает случайные пары изображений, CutMix заменяет области патчами из других изображений, а RandAugment применяет случайные преобразования. Они часто превосходят dropout для CNN.' },
          { type: 'info', variant: 'emerald', text: 'Modern best practice: use weight decay (1e-4 to 1e-2) + data augmentation as primary regularizers, with dropout (0.1–0.3) as a secondary measure. Label smoothing (0.1) further prevents overconfident predictions.', textRu: 'Современная лучшая практика: используйте weight decay (1e-4 – 1e-2) + аугментацию данных как основные регуляризаторы, с dropout (0.1–0.3) как дополнительной мерой. Сглаживание меток (0.1) дополнительно предотвращает чрезмерно уверенные предсказания.' },
        ],
      },
    ],
    conclusion: 'Dropout remains one of the simplest and most effective regularization techniques. Combined with weight decay, data augmentation (MixUp, CutMix), and label smoothing, it forms the regularization backbone of modern deep learning systems.',
    conclusionRu: 'Dropout остаётся одним из простейших и эффективнейших методов регуляризации. В сочетании с weight decay и аугментацией данных он составляет регуляризационную основу большинства систем глубокого обучения.',
    references: [
      { title: 'Dropout: A Simple Way to Prevent Neural Networks from Overfitting', authors: 'Srivastava et al., 2014', url: 'https://jmlr.org/papers/v15/srivastava14a.html' },
    ],
  },

  /* ---- 23. Transfer Learning ---- */
  {
    slug: 'transfer-learning',
    title: 'Transfer Learning',
    titleRu: 'Перенос обучения',
    subtitle: 'Leveraging Pretrained Models for New Tasks',
    subtitleRu: 'Использование предобученных моделей для новых задач',
    authors: 'Jared Wilber',
    date: 'November 2024',
    thumbnail: '/thumbnails/thumbnail-transfer.svg',
    sections: [
      {
        heading: 'Why Transfer Learning Works',
        headingRu: 'Почему перенос обучения работает',
        blocks: [
          { type: 'text', html: '<strong>Transfer learning</strong> reuses a model trained on a large source dataset (e.g., ImageNet) as the starting point for a different but related target task. The pretrained features are often generalizable.', htmlRu: '<strong>Перенос обучения</strong> использует модель, обученную на большом исходном наборе данных (напр., ImageNet), как отправную точку для другой, но связанной целевой задачи. Предобученные признаки часто обобщаемы.' },
          { type: 'chart', chart: 'architecture', title: 'Transfer Learning Pipeline', titleRu: 'Пайплайн переноса обучения', description: 'Pretrain on source → Fine-tune on target', descriptionRu: 'Предобучение на источнике → дообучение на цели', interactive: true },
          { type: 'text', html: 'There are three main strategies: <strong>feature extraction</strong> (freeze base, train head), <strong>fine-tuning</strong> (unfreeze some layers), and <strong>full fine-tuning</strong> (train everything with a small learning rate).', htmlRu: 'Существует три основные стратегии: <strong>извлечение признаков</strong> (заморозить базу, обучить голову), <strong>дообучение</strong> (разморозить часть слоёв) и <strong>полное дообучение</strong> (обучить всё с малым темпом обучения).' },
          { type: 'formula', math: '\\theta_{target} = \\theta_{source} - \\eta \\nabla L_{target}(\\theta_{source})', label: 'Fine-tuning from pretrained weights', labelRu: 'Дообучение от предобученных весов' },
        ],
      },
      {
        heading: 'Modern Transfer Learning: Foundation Models',
        headingRu: 'Современный перенос обучения: базовые модели',
        blocks: [
          { type: 'text', html: 'Modern NLP and vision are dominated by <strong>foundation models</strong> — large models pretrained on diverse data and adapted via fine-tuning or prompting.', htmlRu: 'Современные NLP и компьютерное зрение доминируются <strong>базовыми моделями</strong> — большими моделями, предобученными на разнообразных данных и адаптированными через дообучение или промптинг.' },
          { type: 'chart', chart: 'bar', title: 'Performance: From Scratch vs. Pretrained', titleRu: 'Качество: с нуля vs. предобученная', description: 'How transfer learning boosts performance with less data', descriptionRu: 'Как перенос обучения улучшает качество с меньшим объёмом данных', interactive: true },
          { type: 'formula', math: '\\text{LoRA}: W = W_0 + \\Delta W = W_0 + BA, \\quad B \\in \\mathbb{R}^{d \\times r}, A \\in \\mathbb{R}^{r \\times k}, r \\ll \\min(d,k)', label: 'LoRA: Low-Rank Adaptation', labelRu: 'LoRA: низкоранговая адаптация' },
          { type: 'info', variant: 'accent', text: 'LoRA freezes the original weights and injects trainable low-rank matrices — reducing trainable parameters by 10,000x while matching full fine-tuning performance.', textRu: 'LoRA замораживает исходные веса и внедряет обучаемые низкоранговые матрицы — уменьшая обучаемые параметры в 10 000 раз при сохранении качества полного дообучения.' },
          { type: 'text', html: '<strong>Adapter layers</strong> add small trainable modules between frozen layers. <strong>Prompt tuning</strong> learns continuous prompt embeddings while keeping the model frozen. All are parameter-efficient fine-tuning (PEFT) methods.', htmlRu: '<strong>Адаптерные слои</strong> добавляют малые обучаемые модули между замороженными слоями. <strong>Промпт-тюнинг</strong> обучает непрерывные эмбеддинги промптов при замороженной модели. Всё это методы параметрически эффективного дообучения (PEFT).' },
          { type: 'text', html: 'In practice, the most common pipeline is: 1) Choose a pretrained model (Hugging Face Hub), 2) Apply LoRA with rank 8-64, 3) Train on your data for a few epochs, 4) Merge LoRA weights back into the base model for inference.', htmlRu: 'На практике наиболее частый пайплайн: 1) Выбрать предобученную модель (Hugging Face Hub), 2) Применить LoRA с рангом 8–64, 3) Обучить на своих данных несколько эпох, 4) Объединить веса LoRA с базовой моделью для инференса.' },
        ],
      },
      {
        heading: 'Transfer Learning Best Practices',
        headingRu: 'Лучшие практики переноса обучения',
        blocks: [
          { type: 'text', html: '<strong>When to fine-tune vs. use RAG</strong>: fine-tune when you need to change the model\'s behavior or style; use RAG when you need to add factual knowledge. Combining both (fine-tuning for format + RAG for facts) is often the best approach.', htmlRu: '<strong>Когда дообучать vs. использовать RAG</strong>: дообучайте, когда нужно изменить поведение или стиль модели; используйте RAG, когда нужно добавить фактические знания. Комбинация обоих (дообучение для формата + RAG для фактов) часто является лучшим подходом.' },
          { type: 'text', html: '<strong>QLoRA</strong> quantizes the base model to 4-bit and applies LoRA on top — enabling fine-tuning of 70B parameter models on a single GPU. <strong>DoRA</strong> (Weight-Decomposed LoRA) further improves convergence by decomposing weight updates into magnitude and direction.', htmlRu: '<strong>QLoRA</strong> квантует базовую модель до 4 бит и применяет LoRA поверх — позволяя дообучать 70B-параметрические модели на одном GPU. <strong>DoRA</strong> (LoRA с декомпозицией весов) дополнительно улучшает сходимость, разлагая обновления весов на магнитуду и направление.' },
          { type: 'formula', math: '\text{QLoRA}: W_{4bit} + \Delta W_{LoRA}, \quad \Delta W = BA, \; B \in \mathbb{R}^{d \times r}, A \in \mathbb{R}^{r \times k}', label: 'QLoRA: 4-bit base + LoRA adapters', labelRu: 'QLoRA: 4-битная база + LoRA-адаптеры' },
          { type: 'info', variant: 'accent', text: 'Cross-domain transfer (e.g., English model → Russian task) works best with language-specific adapters or continued pretraining on target-domain data before fine-tuning.', textRu: 'Междоменный перенос (напр., английская модель → русская задача) работает лучше с языково-специфическими адаптерами или продолженным предобучением на данных целевого домена перед дообучением.' },
        ],
      },
    ],
    conclusion: 'Transfer learning has democratized deep learning — enabling practitioners to achieve state-of-the-art results with minimal data and compute. Foundation models with QLoRA, adapters, and RAG have made pretrained representations the default starting point for virtually all NLP and vision tasks.',
    conclusionRu: 'Перенос обучения демократизировал глубокое обучение — позволив достигать передовых результатов с минимальными данными и вычислениями. Базовые модели вроде GPT, BERT и CLIP сделали предобученные представления стандартной отправной точкой.',
    references: [
      { title: 'How transferable are features in deep neural networks?', authors: 'Yosinski et al., 2014', url: 'https://arxiv.org/abs/1411.1792' },
      { title: 'LoRA: Low-Rank Adaptation of Large Language Models', authors: 'Hu et al., 2021', url: 'https://arxiv.org/abs/2106.09685' },
    ],
  },

  /* ---- 24. Vanishing & Exploding Gradients ---- */
  {
    slug: 'vanishing-gradients',
    title: 'Vanishing & Exploding Gradients',
    titleRu: 'Затухающие и взрывающиеся градиенты',
    subtitle: 'The Optimization Challenges of Deep Networks',
    subtitleRu: 'Проблемы оптимизации глубоких сетей',
    authors: 'Jared Wilber',
    date: 'December 2024',
    thumbnail: '/thumbnails/thumbnail-gradients.svg',
    sections: [
      {
        heading: 'The Problem',
        headingRu: 'Проблема',
        blocks: [
          { type: 'text', html: 'During backpropagation through deep or recurrent networks, gradients are <strong>multiplied</strong> at each layer. If weights are small, gradients shrink exponentially (<strong>vanishing</strong>). If large, they grow (<strong>exploding</strong>).', htmlRu: 'При обратном распространении через глубокие или рекуррентные сети градиенты <strong>умножаются</strong> на каждом слое. Если веса малы, градиенты экспоненциально уменьшаются (<strong>затухание</strong>). Если велики — растут (<strong>взрыв</strong>).' },
          { type: 'formula', math: '\\frac{\\partial L}{\\partial w_1} = \\frac{\\partial L}{\\partial h_L} \\cdot \\prod_{l=2}^{L} \\frac{\\partial h_l}{\\partial h_{l-1}} \\cdot \\frac{\\partial h_1}{\\partial w_1}', label: 'Chain rule through L layers', labelRu: 'Цепное правило через L слоёв' },
          { type: 'chart', chart: 'line', title: 'Gradient Norm Across Layers', titleRu: 'Норма градиента по слоям', description: 'How gradients vanish or explode in deep networks', descriptionRu: 'Как градиенты затухают или взрываются в глубоких сетях', interactive: true },
        ],
      },
      {
        heading: 'Solutions',
        headingRu: 'Решения',
        blocks: [
          { type: 'text', html: 'Several innovations address this: <strong>ReLU activations</strong> (avoid sigmoid saturation), <strong>residual/skip connections</strong> (gradient highway), <strong>BatchNorm</strong> (normalize activations), <strong>gradient clipping</strong> (cap exploding gradients), and careful <strong>initialization</strong>.', htmlRu: 'Несколько инноваций решают эту проблему: <strong>активации ReLU</strong> (избегают насыщения сигмоиды), <strong>остаточные/skip-соединения</strong> (шоссе для градиентов), <strong>BatchNorm</strong> (нормализация активаций), <strong>обрезка градиентов</strong> (ограничение взрывающихся градиентов) и аккуратная <strong>инициализация</strong>.' },
          { type: 'formula', math: 'h_l = h_{l-1} + F(h_{l-1}) \\quad \\Rightarrow \\quad \\frac{\\partial h_L}{\\partial h_l} = 1 + \\frac{\\partial}{\\partial h_l}\\sum_{k=l}^{L-1} F(h_k)', label: 'Residual connection: gradient always ≥ 1', labelRu: 'Остаточное соединение: градиент всегда ≥ 1' },
          { type: 'formula', math: 'W \\sim \\mathcal{N}\\!\\left(0, \\frac{2}{n_{in}}\\right) \\quad \\text{(He initialization for ReLU)}', label: 'He initialization', labelRu: 'Инициализация He' },
          { type: 'chart', chart: 'area', title: 'Training Deep Networks: With vs. Without Residual Connections', titleRu: 'Обучение глубоких сетей: с vs. без остаточных соединений', description: 'How skip connections enable training of very deep networks', descriptionRu: 'Как skip-соединения обеспечивают обучение очень глубоких сетей', interactive: true },
          { type: 'info', variant: 'emerald', text: 'Gradient clipping: if ‖g‖ > threshold, scale g → g · (threshold / ‖g‖). Simple but essential for training RNNs and large language models.', textRu: 'Обрезка градиентов: если ‖g‖ > порога, масштабируем g → g · (порог / ‖g‖). Простой, но необходимый метод для обучения RNN и больших языковых моделей.' },
          { type: 'text', html: '<strong>DenseNet</strong> connects every layer to every other layer, providing even richer gradient flow than ResNet. <strong>Dense blocks + transition layers</strong> create highly parameter-efficient architectures.', htmlRu: '<strong>DenseNet</strong> соединяет каждый слой с каждым другим, обеспечивая ещё более богатый поток градиентов, чем ResNet. <strong>Плотные блоки + переходные слои</strong> создают высокоэффективные по параметрам архитектуры.' },
          { type: 'text', html: 'Modern LLM training combines all solutions: <strong>AdamW optimizer</strong> (adaptive LR + decoupled weight decay), <strong>RMSNorm</strong> (simplified LayerNorm), <strong>RoPE</strong> (rotary position embeddings), and <strong>gradient checkpointing</strong> (trades compute for memory).', htmlRu: 'Современное обучение LLM объединяет все решения: <strong>оптимизатор AdamW</strong> (адаптивный LR + раздельный weight decay), <strong>RMSNorm</strong> (упрощённый LayerNorm), <strong>RoPE</strong> (ротационные позиционные эмбеддинги) и <strong>градиентный чекпоинтинг</strong> (обмен вычислений на память).' },
        ],
      },
      {
        heading: 'Loss Landscapes & Sharp Minima',
        headingRu: 'Ландшафты потерь и острые минимумы',
        blocks: [
          { type: 'text', html: 'The <strong>loss landscape</strong> of deep networks is highly non-convex with saddle points, flat regions, and sharp minima. <strong>Sharp minima</strong> generalize poorly — the model overfits to the specific training batch. <strong>Flat minima</strong> (found by large-batch SGD with warmup) generalize better.', htmlRu: '<strong>Ландшафт потерь</strong> глубоких сетей высоко невыпуклый с седловыми точками, плоскими областями и острыми минимумами. <strong>Острые минимумы</strong> плохо обобщают — модель переобучается на конкретный батч. <strong>Плоские минимумы</strong> (находимые SGD с большим батчем и разогревом) обобщают лучше.' },
          { type: 'text', html: '<strong>Sharpness-Aware Minimization (SAM)</strong> explicitly seeks flat minima by minimizing the maximum loss in a neighborhood of the current weights. This consistently improves generalization across architectures.', htmlRu: '<strong>Sharpness-Aware Minimization (SAM)</strong> явно ищет плоские минимумы, минимизируя максимальную потерю в окрестности текущих весов. Это последовательно улучшает обобщение across архитектур.' },
          { type: 'formula', math: 'w_{SAM} = w - \eta \nabla_w L(w + \rho \frac{\nabla_w L(w)}{\|\nabla_w L(w)\|})', label: 'SAM: sharpness-aware update', labelRu: 'SAM: обновление с учётом остроты' },
          { type: 'info', variant: 'emerald', text: 'The interplay between vanishing gradients and loss landscape geometry is an active research area. Modern optimizers (Lion, Sophia) use second-order information to navigate difficult loss landscapes more efficiently.', textRu: 'Взаимодействие затухающих градиентов и геометрии ландшафта потерь — область активных исследований. Современные оптимизаторы (Lion, Sophia) используют информацию второго порядка для более эффективной навигации по сложным ландшафтам потерь.' },
        ],
      },
    ],
    conclusion: 'The vanishing/exploding gradient problem was the central obstacle to training deep networks. The solutions — ReLU, skip connections, normalization, careful initialization, and flat-minimum seeking (SAM) — are the building blocks of every modern architecture.',
    conclusionRu: 'Проблема затухающих/взрывающихся градиентов была главным препятствием в обучении глубоких сетей. Решения — ReLU, skip-connections, нормализация и аккуратная инициализация — являются строительными блоками каждой современной архитектуры.',
    references: [
      { title: 'On the difficulty of training recurrent neural networks', authors: 'Pascanu, Mikolov, Bengio, 2013', url: 'https://arxiv.org/abs/1211.5063' },
      { title: 'Deep Residual Learning for Image Recognition', authors: 'He et al., 2015', url: 'https://arxiv.org/abs/1512.03385' },
    ],
  },

  /* ---- 25. K-Nearest Neighbors ---- */
  {
    slug: 'knn',
    title: 'K-Nearest Neighbors',
    titleRu: 'Метод k-ближайших соседей',
    subtitle: 'Classification & Regression by Local Similarity',
    subtitleRu: 'Классификация и регрессия по локальному сходству',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-knn.svg',
    sections: [
      {
        heading: 'The KNN Algorithm',
        headingRu: 'Алгоритм KNN',
        blocks: [
          { type: 'text', html: 'K-Nearest Neighbors is a <strong>metric method</strong> that classifies an object based on the majority class among its <strong>k closest neighbors</strong> in the feature space. Unlike linear models, KNN does not search for global patterns — it relies on the local assumption that similar objects have similar properties.', htmlRu: 'Метод k-ближайших соседей — это <strong>метрический метод</strong>, который классифицирует объект на основе класса большинства среди его <strong>k ближайших соседей</strong> в пространстве признаков. В отличие от линейных моделей, KNN не ищет глобальные закономерности — он опирается на локальное предположение, что похожие объекты имеют схожие свойства.' },
          { type: 'formula', math: '\hat{y} = \text{mode}\{y_i : x_i \in N_k(x)\}', label: 'KNN classification', labelRu: 'Классификация KNN' },
          { type: 'chart', chart: 'scatter', title: 'KNN Decision Boundaries for Different k', titleRu: 'Границы решения KNN для различных k', description: 'How the decision surface changes with the number of neighbors', descriptionRu: 'Как меняется поверхность решения при изменении числа соседей', interactive: true },
          { type: 'text', html: 'For <strong>regression</strong>, KNN predicts the average (or weighted average) of the target values of the k nearest neighbors. The choice of distance metric — Euclidean, Manhattan, or Minkowski — significantly affects results.', htmlRu: 'Для <strong>регрессии</strong> KNN предсказывает среднее (или взвешенное среднее) целевых значений k ближайших соседей. Выбор метрики расстояния — евклидово, манхэттенское или Минковского — существенно влияет на результаты.' },
          { type: 'formula', math: '\hat{y} = \frac{1}{k}\sum_{x_i \in N_k(x)} y_i', label: 'KNN regression', labelRu: 'Регрессия KNN' },
        ],
      },
      {
        heading: 'Efficient Neighbor Search',
        headingRu: 'Эффективный поиск соседей',
        blocks: [
          { type: 'text', html: 'A naive KNN implementation computes distances to <strong>all</strong> training points — O(n·d) per query. For large datasets, efficient search structures are critical: <strong>KD-trees</strong>, <strong>ball trees</strong>, and <strong>locality-sensitive hashing (LSH)</strong>.', htmlRu: 'Наивная реализация KNN вычисляет расстояния до <strong>всех</strong> обучающих точек — O(n·d) на запрос. Для больших данных критичны эффективные структуры поиска: <strong>KD-деревья</strong>, <strong>ball-деревья</strong> и <strong>локально-чувствительное хеширование (LSH)</strong>.' },
          { type: 'info', variant: 'amber', text: 'KNN is a lazy learner — it stores all training data and only computes at prediction time. This means zero training cost but potentially high inference cost.', textRu: 'KNN — ленивый алгоритм: он хранит все обучающие данные и вычисляет только при предсказании. Это означает нулевую стоимость обучения, но потенциально высокую стоимость инференса.' },
          { type: 'definition', title: 'Curse of Dimensionality', titleRu: 'Проклятие размерности', math: '\text{As } d \to \infty, \frac{\max\|x_i - x_j\|}{\min\|x_i - x_j\|} \to 1', note: 'In high dimensions, all points become equidistant — KNN loses discriminative power. Dimensionality reduction (PCA, t-SNE) is often applied first.', noteRu: 'В высоких размерностях все точки становятся равноудалёнными — KNN теряет различительную силу. Часто сначала применяют уменьшение размерности (PCA, t-SNE).' },
          { type: 'text', html: 'As the Yandex ML Handbook notes, KNN excels when the decision boundary is <strong>irregular</strong> and local patterns matter. However, it struggles with irrelevant features and high-dimensional data.', htmlRu: 'Как отмечает хендбук Яндекса по ML, KNN отлично работает, когда граница решения <strong>нерегулярна</strong> и важны локальные паттерны. Однако он плохо справляется с нерелевантными признаками и многомерными данными.' },
        ],
      },
      {
        heading: 'KNN in Practice: Weighting & Feature Scaling',
        headingRu: 'KNN на практике: взвешивание и масштабирование признаков',
        blocks: [
          { type: 'text', html: '<strong>Distance-weighted KNN</strong> gives closer neighbors more influence: \\(\\hat{y} = \\sum w_i y_i / \\sum w_i\\) where \\(w_i = 1/d(x, x_i)\\). This reduces sensitivity to the choice of k.', htmlRu: '<strong>KNN с весами по расстоянию</strong> даёт ближним соседям больше влияния: \\(\\hat{y} = \\sum w_i y_i / \\sum w_i\\), где \\(w_i = 1/d(x, x_i)\\). Это снижает чувствительность к выбору k.' },
          { type: 'text', html: '<strong>Feature scaling is mandatory</strong> for KNN: unscaled features cause the distance metric to be dominated by features with larger ranges. StandardScaler or MinMaxScaler should be applied before KNN.', htmlRu: '<strong>Масштабирование признаков обязательно</strong> для KNN: немасштабированные признаки заставляют метрику расстояния доминироваться признаками с большими диапазонами. StandardScaler или MinMaxScaler должны применяться до KNN.' },
          { type: 'info', variant: 'emerald', text: 'Modern uses: KNN is used in anomaly detection (outliers have large distances to neighbors), recommendation systems (user-based CF), and as a component in ensemble methods like k-NN bagging.', textRu: 'Современные применения: KNN используется в детекции аномалий (выбросы имеют большие расстояния до соседей), рекомендательных системах (user-based CF) и как компонент ансамблевых методов вроде k-NN бэггинга.' },
        ],
      },
    ],
    conclusion: 'KNN is a simple yet powerful non-parametric method. Its performance depends critically on the choice of k, distance metric, and feature scaling. Distance weighting and proper preprocessing significantly improve results.',
    conclusionRu: 'KNN — простой, но мощный непараметрический метод. Его качество критически зависит от выбора k, метрики расстояния и масштабирования признаков. Взвешивание по расстоянию и правильная предобработка значительно улучшают результаты.',
    references: [
      { title: 'Elements of Statistical Learning', authors: 'Hastie, Tibshirani, Friedman', url: 'https://hastie.su.domains/ElemStatLearn/' },
      { title: 'Метрические методы (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/metricheskie-metody' },
    ],
  },

  /* ---- 26. Gradient Boosting ---- */
  {
    slug: 'gradient-boosting',
    title: 'Gradient Boosting',
    titleRu: 'Градиентный бустинг',
    subtitle: 'Sequential Ensemble Learning on Decision Trees',
    subtitleRu: 'Последовательное ансамблевое обучение на решающих деревьях',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-boosting.svg',
    sections: [
      {
        heading: 'From Bagging to Boosting',
        headingRu: 'От бэггинга к бустингу',
        blocks: [
          { type: 'text', html: 'While Random Forest builds trees <strong>independently</strong> (bagging), boosting constructs a <strong>sequential</strong> ensemble where each new model corrects the errors of previous ones. Gradient Boosting on Decision Trees (GBDT) is the most powerful non-neural network family for tabular data.', htmlRu: 'Пока случайный лес строит деревья <strong>независимо</strong> (бэггинг), бустинг строит <strong>последовательный</strong> ансамбль, где каждая новая модель исправляет ошибки предыдущих. Градиентный бустинг на решающих деревьях (GBDT) — самое мощное семейство не-нейросетевых моделей для табличных данных.' },
          { type: 'formula', math: 'F_m(x) = F_{m-1}(x) + \eta \cdot h_m(x)', label: 'Boosting: sequential composition', labelRu: 'Бустинг: последовательная композиция' },
          { type: 'text', html: 'Each new tree is trained on the <strong>negative gradient</strong> (anti-gradient) of the loss function with respect to the current ensemble predictions. This generalizes the idea of fitting residuals to any differentiable loss function.', htmlRu: 'Каждое новое дерево обучается на <strong>антиградиенте</strong> функции потерь по текущим предсказаниям ансамбля. Это обобщает идею подгонки остатков на любую дифференцируемую функцию потерь.' },
          { type: 'formula', math: 'h_m = \arg\min_h \sum_{i=1}^{n} \left(-\frac{\partial L(y_i, F_{m-1}(x_i))}{\partial F_{m-1}(x_i)} - h(x_i)\right)^2', label: 'Fit tree to anti-gradient', labelRu: 'Подгонка дерева к антиградиенту' },
          { type: 'chart', chart: 'line', title: 'Training & Test Error vs. Number of Trees', titleRu: 'Ошибка обучения и теста vs. число деревьев', description: 'How boosting reduces error sequentially', descriptionRu: 'Как бустинг уменьшает ошибку последовательно', interactive: true },
        ],
      },
      {
        heading: 'XGBoost, LightGBM & CatBoost',
        headingRu: 'XGBoost, LightGBM и CatBoost',
        blocks: [
          { type: 'text', html: 'Three major GBDT implementations dominate: <strong>XGBoost</strong> (symmetric trees, level-wise growth), <strong>LightGBM</strong> (leaf-wise growth, histogram-based), and <strong>CatBoost</strong> (symmetric trees with ordered boosting for categorical features).', htmlRu: 'Три основные реализации GBDT доминируют: <strong>XGBoost</strong> (симметричные деревья, рост по уровням), <strong>LightGBM</strong> (рост по листьям, гистограммный) и <strong>CatBoost</strong> (симметричные деревья с упорядоченным бустингом для категориальных признаков).' },
          { type: 'info', variant: 'emerald', text: 'GBDT wins most Kaggle competitions on tabular data. It handles heterogeneous features, missing values, and categorical variables natively. Training is much faster than neural networks for typical tabular datasets.', textRu: 'GBDT выигрывает большинство соревнований Kaggle на табличных данных. Он нативно работает с разнородными признаками, пропущенными значениями и категориальными переменными. Обучение намного быстрее нейросетей для типичных табличных данных.' },
          { type: 'text', html: 'The <strong>learning rate</strong> η controls the contribution of each tree. Lower values require more trees but improve generalization. CatBoost can automatically select the learning rate using a pre-trained linear model on meta-features of the dataset.', htmlRu: '<strong>Темп обучения</strong> η контролирует вклад каждого дерева. Меньшие значения требуют больше деревьев, но улучшают обобщение. CatBoost может автоматически выбирать темп обучения с помощью предобученной линейной модели на метапризнаках данных.' },
          { type: 'formula', math: 'F_m(x) = F_{m-1}(x) + \eta \cdot h_m(x), \quad \eta \in (0, 1]', label: 'Learning rate in boosting', labelRu: 'Темп обучения в бустинге' },
          { type: 'info', variant: 'accent', text: 'Overfitting in boosting is controlled by: tree depth (typically 3-10), learning rate (0.01-0.3), subsample ratio, column sampling, and early stopping on a validation set.', textRu: 'Переобучение в бустинге контролируется: глубиной дерева (обычно 3–10), темпом обучения (0.01–0.3), долей подвыборки, сэмплированием столбцов и ранней остановкой на валидационной выборке.' },
        ],
      },
      {
        heading: 'Advanced Boosting Techniques',
        headingRu: 'Продвинутые техники бустинга',
        blocks: [
          { type: 'text', html: '<strong>Stochastic gradient boosting</strong> trains each tree on a random subsample of the data, adding randomness that reduces overfitting and speeds up training. <strong>DART</strong> (Dropouts meet Multiple Additive Regression Trees) applies dropout to the boosting ensemble itself, randomly dropping trees during training.', htmlRu: '<strong>Стохастический градиентный бустинг</strong> обучает каждое дерево на случайной подвыборке данных, добавляя случайность, снижающую переобучение и ускоряющую обучение. <strong>DART</strong> применяет dropout к самому ансамблю бустинга, случайно отбрасывая деревья при обучении.' },
          { type: 'text', html: '<strong>Feature importance</strong> in GBDT provides interpretability: gain-based importance measures how much each feature reduces the loss. <strong>SHAP values</strong> provide instance-level explanations showing how each feature contributes to individual predictions.', htmlRu: '<strong>Важность признаков</strong> в GBDT обеспечивает интерпретируемость: gain-важность измеряет, насколько каждый признак уменьшает потерю. <strong>SHAP-значения</strong> дают объяснения на уровне отдельных примеров, показывая вклад каждого признака в индивидуальные предсказания.' },
          { type: 'formula', math: '\text{Gain}(f) = \sum_{t \in \text{trees}} \sum_{s \in \text{splits on } f} \text{loss reduction at split } s', label: 'Gain-based feature importance', labelRu: 'Важность признаков по приросту' },
          { type: 'info', variant: 'emerald', text: 'GBDT vs. neural networks for tabular data: GBDT typically wins on small-to-medium tabular datasets, while neural networks excel on very large datasets with complex feature interactions. TabNet and FT-Transformer are closing the gap.', textRu: 'GBDT vs. нейросети для табличных данных: GBDT обычно выигрывает на малых и средних табличных данных, тогда как нейросети превосходят на очень больших данных со сложными взаимодействиями признаков. TabNet и FT-Transformer сокращают разрыв.' },
        ],
      },
    ],
    conclusion: 'Gradient Boosting is the gold standard for tabular data. Its sequential error-correction approach, combined with decision trees, creates models that are both powerful and interpretable. SHAP values and feature importance make GBDT uniquely transparent for production use.',
    conclusionRu: 'Градиентный бустинг — золотой стандарт для табличных данных. Его подход последовательной коррекции ошибок в сочетании с решающими деревьями создаёт мощные и интерпретируемые модели.',
    references: [
      { title: 'Greedy Function Approximation: A Gradient Boosting Machine', authors: 'Jerome Friedman, 2001', url: 'https://jerryfriedman.su.domains/ftp/trebst.pdf' },
      { title: 'Градиентный бустинг (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/gradientnyj-busting' },
    ],
  },

  /* ---- 27. Hyperparameter Tuning ---- */
  {
    slug: 'hyperparameter-tuning',
    title: 'Hyperparameter Tuning',
    titleRu: 'Подбор гиперпараметров',
    subtitle: 'Grid Search, Random Search & Bayesian Optimization',
    subtitleRu: 'Перебор по сетке, случайный поиск и байесовская оптимизация',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-hypertuning.svg',
    sections: [
      {
        heading: 'Parameters vs. Hyperparameters',
        headingRu: 'Параметры vs. гиперпараметры',
        blocks: [
          { type: 'text', html: '<strong>Parameters</strong> are learned during training (weights, tree structure). <strong>Hyperparameters</strong> are set before training: tree depth, regularization strength, learning rate, number of neighbors in KNN. Choosing the right hyperparameters is crucial for model performance.', htmlRu: '<strong>Параметры</strong> настраиваются в процессе обучения (веса, структура дерева). <strong>Гиперпараметры</strong> фиксируются до начала обучения: глубина дерева, сила регуляризации, темп обучения, число соседей в KNN. Выбор правильных гиперпараметров критичен для качества модели.' },
          { type: 'definition', title: 'Validation Strategy', titleRu: 'Стратегия валидации', math: '\text{Split: Train} \to \text{Val} \to \text{Test} \quad \text{or} \quad \text{CV}', note: 'Never tune hyperparameters on the test set. Use a separate validation set or cross-validation.', noteRu: 'Никогда не настраивайте гиперпараметры на тестовой выборке. Используйте отдельную валидационную выборку или кросс-валидацию.' },
        ],
      },
      {
        heading: 'Search Strategies',
        headingRu: 'Стратегии поиска',
        blocks: [
          { type: 'text', html: '<strong>Grid Search</strong> evaluates all combinations on a fixed grid — exhaustive but slow. <strong>Random Search</strong> samples from distributions — surprisingly effective with fewer iterations. With 60 random trials, there is a 95% chance of hitting the top-5% region.', htmlRu: '<strong>Перебор по сетке</strong> оценивает все комбинации на фиксированной сетке — исчерпывающий, но медленный. <strong>Случайный поиск</strong> сэмплирует из распределений — удивительно эффективный при меньшем числе итераций. При 60 случайных испытаниях есть 95% шанс попасть в топ-5% область.' },
          { type: 'text', html: '<strong>Bayesian Optimization</strong> builds a probabilistic surrogate model (usually Gaussian Process) of the objective function and uses an <strong>acquisition function</strong> to balance exploration (high uncertainty) vs. exploitation (high predicted value). This dramatically reduces the number of evaluations needed.', htmlRu: '<strong>Байесовская оптимизация</strong> строит вероятностную суррогатную модель (обычно гауссовский процесс) целевой функции и использует <strong>функцию приобретения</strong> для баланса исследования (высокая неопределённость) и эксплуатации (высокое предсказанное значение). Это значительно уменьшает необходимое число вычислений.' },
          { type: 'formula', math: '\alpha(x) = \mu(x) + \kappa \cdot \sigma(x)', label: 'Acquisition function (UCB)', labelRu: 'Функция приобретения (UCB)' },
          { type: 'info', variant: 'emerald', text: 'Practical recommendation: start with Random Search (fast, broad coverage), then refine with Bayesian Optimization. Libraries: Optuna, Hyperopt, scikit-optimize.', textRu: 'Практическая рекомендация: начните со случайного поиска (быстро, широкое покрытие), затем уточните байесовской оптимизацией. Библиотеки: Optuna, Hyperopt, scikit-optimize.' },
        ],
      },
      {
        heading: 'Advanced Tuning Techniques',
        headingRu: 'Продвинутые техники настройки',
        blocks: [
          { type: 'text', html: '<strong>Multi-fidelity optimization</strong> uses cheap approximations (fewer epochs, smaller data subsets) to quickly discard bad configurations before full training. <strong>Hyperband</strong> and <strong>BOHB</strong> combine bandit-based early stopping with Bayesian optimization for efficient search at scale.', htmlRu: '<strong>Многоуровневая оптимизация</strong> использует дешёвые аппроксимации (меньше эпох, подмножества данных) для быстрого отсева плохих конфигураций перед полным обучением. <strong>Hyperband</strong> и <strong>BOHB</strong> объединяют раннюю остановку на основе бандитов с байесовской оптимизацией для эффективного масштабного поиска.' },
          { type: 'text', html: '<strong>Population-Based Training (PBT)</strong> trains multiple models in parallel, periodically copying weights from the best performers and perturbing their hyperparameters. This adapts hyperparameters during training, often finding better schedules than fixed values.', htmlRu: '<strong>Population-Based Training (PBT)</strong> обучает несколько моделей параллельно, периодически копируя веса лучших и возмущая их гиперпараметры. Это адаптирует гиперпараметры в процессе обучения, часто находя лучшие расписания, чем фиксированные значения.' },
          { type: 'definition', title: 'Hyperparameter Importance', titleRu: 'Важность гиперпараметров', math: '\text{Most impactful: } \eta > \text{depth} > \text{batch size} > \lambda', note: 'Empirically, the learning rate is the single most important hyperparameter across virtually all model types. Tree depth dominates for GBDT, while dropout rate matters most for CNNs.', noteRu: 'Эмпирически, темп обучения — самый важный гиперпараметр практически для всех типов моделей. Глубина дерева доминирует для GBDT, а вероятность dropout наиболее важна для CNN.' },
          { type: 'info', variant: 'accent', text: 'Practical workflow: (1) Start with defaults, (2) coarse Random Search over 20-50 trials, (3) Bayesian Optimization around the best region for 50-100 trials, (4) manual inspection and fine-tuning of the top configuration.', textRu: 'Практический рабочий процесс: (1) Начните со значений по умолчанию, (2) грубый случайный поиск на 20-50 испытаниях, (3) Байесовская оптимизация вокруг лучшей области на 50-100 испытаниях, (4) ручной осмотр и тонкая настройка лучшей конфигурации.' },
        ],
      },
      {
        heading: 'Automated ML & Neural Architecture Search',
        headingRu: 'Автоматизированный ML и поиск нейронных архитектур',
        blocks: [
          { type: 'text', html: '<strong>AutoML</strong> frameworks (Auto-sklearn, TPOT, FLAML) automate the entire pipeline: feature engineering, model selection, and hyperparameter tuning. They combine meta-learning (which models work well on similar datasets) with Bayesian optimization.', htmlRu: 'Фреймворки <strong>AutoML</strong> (Auto-sklearn, TPOT, FLAML) автоматизируют весь пайплайн: инжиниринг признаков, выбор модели и подбор гиперпараметров. Они объединяют мета-обучение (какие модели хорошо работают на похожих данных) с байесовской оптимизацией.' },
          { type: 'text', html: '<strong>Neural Architecture Search (NAS)</strong> automates the design of neural network architectures. Modern approaches like <strong>DARTS</strong> (Differentiable NAS) and <strong>ENAS</strong> (Efficient NAS) search over architecture spaces using gradient-based optimization rather than reinforcement learning.', htmlRu: '<strong>Поиск нейронных архитектур (NAS)</strong> автоматизирует проектирование архитектур нейронных сетей. Современные подходы <strong>DARTS</strong> (дифференцируемый NAS) и <strong>ENAS</strong> (эффективный NAS) ищут по пространствам архитектур с помощью градиентной оптимизации вместо обучения с подкреплением.' },
          { type: 'info', variant: 'emerald', text: 'Key insight: most hyperparameter importance follows a Pareto distribution — 20% of hyperparameters account for 80% of the variance. Focus your search budget on the most impactful parameters (learning rate, depth, regularization).', textRu: 'Ключевой инсайт: важность гиперпараметров подчиняется распределению Парето — 20% гиперпараметров обусловливают 80% дисперсии. Сфокусируйте бюджет поиска на самых влиятельных параметрах (темп обучения, глубина, регуляризация).' },
        ],
      },
    ],
    conclusion: 'Hyperparameter tuning bridges the gap between a good algorithm and a great model. Random Search, Bayesian Optimization, and AutoML frameworks efficiently navigate the hyperparameter space. Neural Architecture Search extends this to automated model design.',
    conclusionRu: 'Подбор гиперпараметров — мост между хорошим алгоритмом и отличной моделью. Случайный поиск и байесовская оптимизация — самые эффективные подходы для навигации по пространству гиперпараметров.',
    references: [
      { title: 'Random Search for Hyper-Parameter Optimization', authors: 'Bergstra & Bengio, 2012', url: 'https://jmlr.org/papers/v13/bergstra12a.html' },
      { title: 'Подбор гиперпараметров (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/podbor-giperparametrov' },
    ],
  },

  /* ---- 28. Naive Bayes & Probabilistic Models ---- */
  {
    slug: 'naive-bayes',
    title: 'Naive Bayes & Probabilistic Models',
    titleRu: 'Наивный Байес и вероятностные модели',
    subtitle: 'Generative Classification Through Bayes Theorem',
    subtitleRu: 'Генеративная классификация через теорему Байеса',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-bayes.svg',
    sections: [
      {
        heading: 'The Probabilistic Approach',
        headingRu: 'Вероятностный подход',
        blocks: [
          { type: 'text', html: 'Probabilistic models treat classification as estimating <strong>P(y|x)</strong> — the posterior probability of class y given features x. By Bayes\' theorem, this decomposes into the <strong>likelihood</strong> P(x|y) and the <strong>prior</strong> P(y).', htmlRu: 'Вероятностные модели трактуют классификацию как оценку <strong>P(y|x)</strong> — апостериорной вероятности класса y при данных признаках x. По теореме Байеса это разлагается на <strong>правдоподобие</strong> P(x|y) и <strong>априорное</strong> P(y).' },
          { type: 'formula', math: 'P(y|x) = \frac{P(x|y) \cdot P(y)}{P(x)}', label: "Bayes' theorem", labelRu: 'Теорема Байеса' },
          { type: 'text', html: 'The <strong>Naive Bayes</strong> classifier makes the "naive" assumption that all features are <strong>conditionally independent</strong> given the class. Despite this strong assumption, it performs surprisingly well on text classification, spam detection, and many other tasks.', htmlRu: 'Классификатор <strong>наивного Байеса</strong> делает «наивное» предположение, что все признаки <strong>условно независимы</strong> при данном классе. Несмотря на это сильное допущение, он удивительно хорошо работает на классификации текстов, обнаружении спама и многих других задачах.' },
          { type: 'formula', math: 'P(y|x) \propto P(y) \prod_{j=1}^{d} P(x_j|y)', label: 'Naive Bayes assumption', labelRu: 'Предположение наивного Байеса' },
        ],
      },
      {
        heading: 'Variants & Applications',
        headingRu: 'Варианты и применения',
        blocks: [
          { type: 'text', html: '<strong>Multinomial NB</strong> models word counts — ideal for text. <strong>Gaussian NB</strong> assumes continuous features follow normal distributions. <strong>Bernoulli NB</strong> handles binary features. All variants are extremely fast to train and serve as strong baselines.', htmlRu: '<strong>Мультиномиальный NB</strong> моделирует частоты слов — идеален для текстов. <strong>Гауссовский NB</strong> предполагает нормальное распределение непрерывных признаков. <strong>Бернуллиевский NB</strong> работает с бинарными признаками. Все варианты крайне быстры в обучении и служат надёжными базовыми моделями.' },
          { type: 'definition', title: 'Generative vs. Discriminative', titleRu: 'Генеративный vs. дискриминативный', math: '\text{Generative: } P(x|y) \quad \text{vs.} \quad \text{Discriminative: } P(y|x)', note: 'Generative models (Naive Bayes) model the data distribution. Discriminative models (Logistic Regression) model the decision boundary directly. With enough data, discriminative usually wins.', noteRu: 'Генеративные модели (наивный Байес) моделируют распределение данных. Дискриминативные (логистическая регрессия) моделируют границу решения напрямую. При достаточном количестве данных дискриминативные обычно выигрывают.' },
          { type: 'info', variant: 'accent', text: 'Naive Bayes and Logistic Regression are a complementary pair: NB is generative and works well with little data; LR is discriminative and excels with more data. Both produce calibrated probabilities.', textRu: 'Наивный Байес и логистическая регрессия — дополняющая пара: NB генеративен и хорошо работает с малым объёмом данных; LR дискриминативна и превосходит при больших данных. Оба выдают калиброванные вероятности.' },
        ],
      },
      {
        heading: 'Practical Considerations',
        headingRu: 'Практические соображения',
        blocks: [
          { type: 'text', html: '<strong>Smoothing</strong> (Laplace/Lidstone) prevents zero probabilities when a feature value is unseen in training. This is essential for text classification where vocabulary mismatch is common. Add-1 smoothing adds one to each count.', htmlRu: '<strong>Сглаживание</strong> (Лапласа/Лидстона) предотвращает нулевые вероятности, когда значение признака не встречалось при обучении. Это важно для классификации текстов, где несовпадение словаря обычно. Сглаживание Add-1 добавляет единицу к каждому счётчику.' },
          { type: 'formula', math: 'P(x_j|y) = \frac{N_{x_j,y} + \alpha}{N_y + \alpha \cdot |V|}', label: 'Laplace smoothing', labelRu: 'Сглаживание Лапласа' },
          { type: 'text', html: 'Despite the "naive" independence assumption, NB often works well because classification depends on which class has higher probability, not the exact probability values. The bias from the assumption can reduce variance enough to improve overall accuracy.', htmlRu: 'Несмотря на «наивное» предположение независимости, NB часто работает хорошо, потому что классификация зависит от того, какой класс имеет более высокую вероятность, а не от точных значений. Смещение от предположения может уменьшить дисперсию достаточно для улучшения общей точности.' },
          { type: 'info', variant: 'emerald', text: 'NB excels on high-dimensional sparse data (text, genomics) where the independence assumption is least harmful. It\'s the go-to baseline for text classification and spam filtering, often competitive with much more complex models.', textRu: 'NB превосходит на высокоразмерных разреженных данных (тексты, геномика), где предположение независимости наименее вредно. Это базовый выбор для классификации текстов и фильтрации спама, часто конкурентоспособный с гораздо более сложными моделями.' },
        ],
      },
      {
        heading: 'Beyond Naive Bayes',
        headingRu: 'За рамками наивного Байеса',
        blocks: [
          { type: 'text', html: '<strong>Semi-Naive Bayes</strong> relaxes the independence assumption: <strong>AODE</strong> (Averaged One-Dependence Estimators) averages over models where each feature depends on one other feature. <strong>TAN</strong> (Tree Augmented Naive Bayes) adds a tree structure among features.', htmlRu: '<strong>Полу-наивный Байес</strong> ослабляет предположение независимости: <strong>AODE</strong> усредняет по моделям, где каждый признак зависит от одного другого. <strong>TAN</strong> (Байес с деревом) добавляет древовидную структуру между признаками.' },
          { type: 'text', html: '<strong>Bayesian Networks</strong> generalize NB to full probabilistic graphical models with arbitrary dependency structures. Structure learning algorithms (PC, GES) discover the graph from data, enabling causal reasoning.', htmlRu: '<strong>Байесовские сети</strong> обобщают NB на полные вероятностные графические модели с произвольными зависимостями. Алгоритмы обучения структуры (PC, GES) обнаруживают граф из данных, обеспечивая причинный анализ.' },
          { type: 'info', variant: 'amber', text: 'NB as a feature extractor: computing NB log-likelihoods as features for a downstream classifier (e.g., logistic regression) can boost performance while maintaining interpretability.', textRu: 'NB как извлекатель признаков: вычисление логарифмов правдоподобия NB как признаков для последующего классификатора (напр., логистической регрессии) может улучшить качество при сохранении интерпретируемости.' },
        ],
      },
    ],
    conclusion: 'Naive Bayes is a fast, interpretable generative classifier. Despite its simplicity, it remains competitive on text data and serves as an essential baseline. Extensions like TAN and Bayesian Networks relax the independence assumption for improved accuracy.',
    conclusionRu: 'Наивный Байес — быстрый, интерпретируемый генеративный классификатор. Несмотря на простоту, он остаётся конкурентоспособным на текстовых данных и служит необходимой базовой моделью в инструментарии ML.',
    references: [
      { title: 'An Introduction to Information Retrieval', authors: 'Manning, Raghavan, Schütze', url: 'https://nlp.stanford.edu/IR-book/' },
      { title: 'Вероятностный подход в ML (Хендбук Яндекса)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/veroyatnostnyi-podkhod-v-ml' },
    ],
  },

  /* ---- 29. Graph Neural Networks ---- */
  {
    slug: 'gnn',
    title: 'Graph Neural Networks',
    titleRu: 'Графовые нейронные сети',
    subtitle: 'Learning on Graph-Structured Data',
    subtitleRu: 'Обучение на данных со структурой графа',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-gnn.svg',
    sections: [
      {
        heading: 'Graph Data & Tasks',
        headingRu: 'Графовые данные и задачи',
        blocks: [
          { type: 'text', html: 'Graph Neural Networks (GNNs) process data with <strong>graph structure</strong> — nodes (vertices) connected by edges. Applications include social networks, molecular graphs, knowledge graphs, and citation networks.', htmlRu: 'Графовые нейронные сети (GNN) обрабатывают данные со <strong>структурой графа</strong> — вершины, соединённые рёбрами. Применения: социальные сети, молекулярные графы, графы знаний и графы цитирований.' },
          { type: 'text', html: 'GNN tasks operate at three levels: <strong>node-level</strong> (classify individual nodes), <strong>edge-level</strong> (predict missing links), and <strong>graph-level</strong> (classify entire graphs, e.g., molecular properties).', htmlRu: 'Задачи GNN работают на трёх уровнях: <strong>уровень вершин</strong> (классификация отдельных вершин), <strong>уровень рёбер</strong> (предсказание пропущенных связей) и <strong>уровень графа</strong> (классификация целых графов, например свойств молекул).' },
          { type: 'info', variant: 'amber', text: 'GNNs must handle variable-size graphs and be invariant to node permutations — renumbering vertices should not change predictions.', textRu: 'GNN должны работать с графами переменного размера и быть инвариантны к перестановкам вершин — перенумерация вершин не должна менять предсказания.' },
        ],
      },
      {
        heading: 'Message Passing & Architectures',
        headingRu: 'Передача сообщений и архитектуры',
        blocks: [
          { type: 'text', html: 'The <strong>message passing</strong> paradigm is the foundation of spatial GNNs: each node aggregates information from its neighbors and updates its hidden state. After N layers, each node captures information from its N-hop neighborhood (receptive field).', htmlRu: 'Парадигма <strong>передачи сообщений</strong> — основа пространственных GNN: каждая вершина агрегирует информацию от соседей и обновляет своё скрытое состояние. После N слоёв каждая вершина захватывает информацию из N-окрестности (рецептивное поле).' },
          { type: 'formula', math: 'h_v^{(l+1)} = \text{UPDATE}\!\left(h_v^{(l)}, \text{AGG}\!\left(\{h_u^{(l)} : u \in \mathcal{N}(v)\}\right)\right)', label: 'Message passing update', labelRu: 'Обновление при передаче сообщений' },
          { type: 'text', html: 'Key architectures: <strong>GCN</strong> (spectral convolution via normalized adjacency), <strong>GraphSAGE</strong> (learnable aggregation with sampling), <strong>GAT</strong> (attention-weighted neighbor aggregation). GAT assigns learnable weights to neighbors, focusing on the most informative ones.', htmlRu: 'Ключевые архитектуры: <strong>GCN</strong> (спектральная свёртка через нормированную матрицу смежности), <strong>GraphSAGE</strong> (обучаемая агрегация с сэмплированием), <strong>GAT</strong> (агрегация соседей с весами внимания). GAT назначает обучаемые веса соседям, фокусируясь на наиболее информативных.' },
          { type: 'info', variant: 'emerald', text: 'GNNs are used in drug discovery (molecular property prediction), social network analysis, recommendation systems, fraud detection, and particle physics simulations.', textRu: 'GNN используются в разработке лекарств (предсказание свойств молекул), анализе социальных сетей, рекомендательных системах, обнаружении мошенничества и симуляциях физики элементарных частиц.' },
        ],
      },
      {
        heading: 'Spectral Methods & Scalability',
        headingRu: 'Спектральные методы и масштабируемость',
        blocks: [
          { type: 'text', html: '<strong>Spectral GNNs</strong> operate in the Fourier domain of the graph: the graph Laplacian eigenvectors serve as a basis for graph signals, analogous to the standard Fourier basis for time signals. GCN can be viewed as a first-order approximation of spectral convolution.', htmlRu: '<strong>Спектральные GNN</strong> работают в области Фурье графа: собственные векторы лапласиана графа служат базисом для графовых сигналов, аналогично стандартному базису Фурье для временных сигналов. GCN можно рассматривать как аппроксимацию первого порядка спектральной свёртки.' },
          { type: 'formula', math: 'g_\theta * x \approx \theta(I + \tilde{D}^{-1/2}\tilde{A}\tilde{D}^{-1/2})X\Theta', label: 'GCN propagation (first-order spectral)', labelRu: 'Распространение GCN (спектральное первого порядка)' },
          { type: 'text', html: '<strong>Over-smoothing</strong> is a key limitation: as GNN depth increases, node representations become indistinguishable. Solutions include residual connections, Jumping Knowledge networks, and limiting depth to 2-3 layers. For large graphs, <strong>neighbor sampling</strong> (GraphSAGE) and <strong>cluster-based training</strong> (ClusterGCN) enable scalable training.', htmlRu: '<strong>Чрезмерное сглаживание</strong> — ключевое ограничение: с ростом глубины GNN представления вершин становятся неразличимыми. Решения: остаточные соединения, сети Jumping Knowledge и ограничение глубины 2-3 слоями. Для больших графов <strong>сэмплирование соседей</strong> (GraphSAGE) и <strong>кластерное обучение</strong> (ClusterGCN) позволяют масштабируемое обучение.' },
          { type: 'info', variant: 'amber', text: 'RGCN (Relational GCN) handles heterogeneous graphs with multiple edge types using relation-specific weight matrices — crucial for knowledge graph completion and drug-target interaction prediction.', textRu: 'RGCN (реляционный GCN) работает с гетерогенными графами с несколькими типами рёбер, используя специфичные для отношений матрицы весов — критично для дополнения графов знаний и предсказания взаимодействия лекарств с мишенями.' },
        ],
      },
      {
        heading: 'GNN Expressiveness & Graph Transformers',
        headingRu: 'Выразительность GNN и графовые трансформеры',
        blocks: [
          { type: 'text', html: '<strong>WL test</strong> (Weisfeiler-Lehman) measures GNN expressiveness: standard message-passing GNNs are at most as powerful as the 1-WL test. <strong>GIN</strong> (Graph Isomorphism Network) provably matches this upper bound with an MLP-based aggregation.', htmlRu: '<strong>WL-тест</strong> (Вайсфайлер-Леман) измеряет выразительность GNN: стандартные GNN с передачей сообщений не мощнее 1-WL теста. <strong>GIN</strong> (сеть изоморфизма графов) доказуемо достигает этой верхней границы с MLP-агрегацией.' },
          { type: 'text', html: '<strong>Graph Transformers</strong> extend the transformer architecture to graphs using structural encodings (Laplacian eigenvectors, random walk features). Models like <strong>Graphormer</strong> and <strong>GPS</strong> combine global attention with local message passing for state-of-the-art graph-level tasks.', htmlRu: '<strong>Графовые трансформеры</strong> расширяют архитектуру трансформера на графы с помощью структурных кодирований (собственные векторы лапласиана, признаки случайных блужданий). Модели <strong>Graphormer</strong> и <strong>GPS</strong> объединяют глобальное внимание с локальной передачей сообщений для передовых задач уровня графа.' },
          { type: 'info', variant: 'emerald', text: 'GNNs in drug discovery: GNNs predict molecular properties (solubility, toxicity), protein-ligand binding, and generate novel molecules. They\'re a key component of AlphaFold\'s structure prediction pipeline.', textRu: 'GNN в разработке лекарств: GNN предсказывают свойства молекул (растворимость, токсичность), связывание белок-лиганд и генерируют новые молекулы. Они — ключевой компонент пайплайна предсказания структур AlphaFold.' },
        ],
      },
    ],
    conclusion: 'Graph Neural Networks extend deep learning to graph-structured data. The message passing framework unifies various GNN architectures. Graph Transformers and expressiveness analysis (WL test) push the boundaries of graph-level learning, with major applications in drug discovery and knowledge graphs.',
    conclusionRu: 'Графовые нейронные сети расширяют глубокое обучение на данные со структурой графа. Фреймворк передачи сообщений объединяет различные архитектуры GNN и позволяет обучаться на сложных реляционных данных.',
    references: [
      { title: 'Semi-Supervised Classification with Graph Convolutional Networks', authors: 'Kipf & Welling, 2017', url: 'https://arxiv.org/abs/1609.02907' },
      { title: 'Графовые нейронные сети (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/grafovye-nejronnye-seti' },
    ],
  },

  /* ---- 30. Diffusion Models ---- */
  {
    slug: 'diffusion-models',
    title: 'Diffusion Models',
    titleRu: 'Диффузионные модели',
    subtitle: 'Generative Modeling Through Gradual Denoising',
    subtitleRu: 'Генеративное моделирование через постепенное расшумление',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-diffusion.svg',
    sections: [
      {
        heading: 'Forward & Reverse Process',
        headingRu: 'Прямой и обратный процессы',
        blocks: [
          { type: 'text', html: 'Diffusion models generate data through a two-phase process: the <strong>forward process</strong> gradually adds Gaussian noise to data until it becomes pure noise, while the <strong>reverse process</strong> learns to denoise step-by-step to reconstruct the original data.', htmlRu: 'Диффузионные модели генерируют данные через двухфазный процесс: <strong>прямой процесс</strong> постепенно добавляет гауссовский шум к данным до чистого шума, а <strong>обратный процесс</strong> учится расшумлять шаг за шагом для восстановления исходных данных.' },
          { type: 'formula', math: 'q(x_t|x_{t-1}) = \mathcal{N}(x_t; \sqrt{1-\beta_t}x_{t-1}, \beta_t I)', label: 'Forward process (adding noise)', labelRu: 'Прямой процесс (добавление шума)' },
          { type: 'text', html: 'The model is trained to predict the <strong>noise</strong> added at each step. During generation, we start from random Gaussian noise and iteratively denoise. DDPM (Denoising Diffusion Probabilistic Models) is the foundational architecture.', htmlRu: 'Модель обучается предсказывать <strong>шум</strong>, добавленный на каждом шаге. При генерации мы начинаем со случайного гауссовского шума и итеративно расшумляем. DDPM (вероятностные модели дениоизующей диффузии) — базовая архитектура.' },
          { type: 'formula', math: 'L = \mathbb{E}_{t,x_0,\epsilon}\left[\|\epsilon - \epsilon_\theta(x_t, t)\|^2\right]', label: 'Training loss: predict the noise', labelRu: 'Функция потерь: предсказание шума' },
        ],
      },
      {
        heading: 'Guidance & Modern Architectures',
        headingRu: 'Управление генерацией и современные архитектуры',
        blocks: [
          { type: 'text', html: '<strong>Classifier guidance</strong> uses a pretrained noisy classifier to steer generation toward a desired class. <strong>Classifier-free guidance</strong> trains a single conditional model and interpolates between conditional and unconditional predictions — the standard approach in Stable Diffusion and DALL-E 2.', htmlRu: '<strong>Управление классификатором</strong> использует предобученный «шумный» классификатор для направления генерации к нужному классу. <strong>Управление без классификатора</strong> обучает единую условную модель и интерполирует между условными и безусловными предсказаниями — стандартный подход в Stable Diffusion и DALL-E 2.' },
          { type: 'info', variant: 'emerald', text: 'Diffusion models surpassed GANs in image quality (Dhariwal & Nichol, 2021). They power Stable Diffusion, DALL-E 2, Midjourney, and Imagen. Key advantage: better mode coverage and training stability.', textRu: 'Диффузионные модели превзошли GAN в качестве изображений (Dhariwal & Nichol, 2021). Они лежат в основе Stable Diffusion, DALL-E 2, Midjourney и Imagen. Ключевое преимущество: лучшее покрытие мод и стабильность обучения.' },
          { type: 'text', html: 'The noise <strong>schedule</strong> (linear, cosine, or learned) controls how noise is added across timesteps. Cosine schedules prevent the last steps from being too noisy. <strong>DDIM</strong> enables deterministic sampling with fewer steps, dramatically speeding up generation.', htmlRu: '<strong>Расписание</strong> шума (линейное, косинусное или обучаемое) контролирует, как шум добавляется по шагам. Косинусное расписание предотвращает слишком шумные последние шаги. <strong>DDIM</strong> обеспечивает детерминированное сэмплирование с меньшим числом шагов, значительно ускоряя генерацию.' },
        ],
      },
      {
        heading: 'Score-Based Models & Applications',
        headingRu: 'Модели на основе скора и применения',
        blocks: [
          { type: 'text', html: '<strong>Score-based generative models</strong> estimate the score function ∇ₓlog p(x) — the gradient of the log-density. This is mathematically equivalent to predicting noise in diffusion models. <strong>Stochastic Differential Equations (SDEs)</strong> unify DDPM and score-based models into a continuous-time framework.', htmlRu: '<strong>Генеративные модели на основе скора</strong> оценивают функцию скора ∇ₓlog p(x) — градиент логарифма плотности. Это математически эквивалентно предсказанию шума в диффузионных моделях. <strong>Стохастические дифференциальные уравнения (SDE)</strong> объединяют DDPM и модели на основе скора в непрерывный по времени фреймворк.' },
          { type: 'formula', math: '\text{d}x = f(x,t)\text{d}t + g(t)\text{d}w, \quad \text{reverse: } \text{d}x = [f - g^2\nabla_x\log p_t(x)]\text{d}t + g\text{d}\bar{w}', label: 'Forward/reverse SDE for diffusion', labelRu: 'Прямое/обратное SDE для диффузии' },
          { type: 'text', html: 'Beyond images: diffusion models generate <strong>audio</strong> (AudioLDM), <strong>3D shapes</strong> (Point-E), <strong>video</strong> (Make-A-Video), and <strong>protein structures</strong> (RFdiffusion). Latent diffusion operates in a compressed latent space (via VAE) for efficiency.', htmlRu: 'За пределами изображений: диффузионные модели генерируют <strong>аудио</strong> (AudioLDM), <strong>3D-формы</strong> (Point-E), <strong>видео</strong> (Make-A-Video) и <strong>структуры белков</strong> (RFdiffusion). Латентная диффузия работает в сжатом латентном пространстве (через VAE) для эффективности.' },
          { type: 'info', variant: 'accent', text: 'Key speedup techniques: DDIM (fewer steps), distillation (progressive/consistency), and latent diffusion (smaller resolution). These reduce generation from ~1000 steps to 1-4 steps.', textRu: 'Ключевые техники ускорения: DDIM (меньше шагов), дистилляция (прогрессивная/консистентная) и латентная диффузия (меньшее разрешение). Они сокращают генерацию с ~1000 шагов до 1-4 шагов.' },
        ],
      },
      {
        heading: 'Advanced Diffusion: Flow Matching & Consistency',
        headingRu: 'Продвинутые диффузии: Flow Matching и консистентность',
        blocks: [
          { type: 'text', html: '<strong>Flow Matching</strong> (used in Stable Diffusion 3) parameterizes generation as a continuous flow via an ODE, trained to match a simple target distribution. It\'s simpler to train than DDPM and supports variable-length generation. <strong>Rectified Flow</strong> straightens the generation path for faster sampling.', htmlRu: '<strong>Flow Matching</strong> (используется в Stable Diffusion 3) параметризует генерацию как непрерывный поток через ODE, обучаясь соответствовать простому целевому распределению. Он проще в обучении, чем DDPM, и поддерживает генерацию переменной длины. <strong>Rectified Flow</strong> выпрямляет путь генерации для более быстрого сэмплирования.' },
          { type: 'text', html: '<strong>Consistency Models</strong> learn to map any noisy sample to the clean output in a single step by enforcing self-consistency: outputs for (x_t, t) and (x_{t\'}, t\') from the same trajectory must match. This enables 1-2 step generation.', htmlRu: '<strong>Консистентные модели</strong> обучаются отображать любой шумный пример в чистый выход за один шаг, обеспечивая самосогласованность: выходы для (x_t, t) и (x_{t\'}, t\') из одной траектории должны совпадать. Это позволяет генерацию за 1-2 шага.' },
          { type: 'info', variant: 'emerald', text: 'Diffusion models are expanding beyond images: <strong>video generation</strong> (Sora, Runway), <strong>3D generation</strong> (Zero123, DreamFusion), <strong>molecular design</strong> (DiffDock, RFdiffusion), and <strong>code generation</strong> (DiffuCoder). The framework is becoming universal for generative modeling.', textRu: 'Диффузионные модели расширяются за пределы изображений: <strong>генерация видео</strong> (Sora, Runway), <strong>3D-генерация</strong> (Zero123, DreamFusion), <strong>молекулярный дизайн</strong> (DiffDock, RFdiffusion) и <strong>генерация кода</strong> (DiffuCoder). Фреймворк становится универсальным для генеративного моделирования.' },
        ],
      },
    ],
    conclusion: 'Diffusion models are the state-of-the-art in image generation. Their gradual denoising approach, combined with classifier-free guidance, produces remarkably diverse and high-quality samples. Flow matching and consistency models are pushing toward real-time generation across modalities.',
    conclusionRu: 'Диффузионные модели — передовой метод генерации изображений. Их подход постепенного расшумления в сочетании с управлением без классификатора создаёт удивительно разнообразные и качественные семплы.',
    references: [
      { title: 'Denoising Diffusion Probabilistic Models', authors: 'Ho, Jain, Abbeel, 2020', url: 'https://arxiv.org/abs/2006.11239' },
      { title: 'Диффузионные модели (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/diffuzionnye-modeli' },
    ],
  },

  /* ---- 31. Language Models ---- */
  {
    slug: 'language-models',
    title: 'Language Models',
    titleRu: 'Языковые модели',
    subtitle: 'From N-grams to Large Language Models (LLMs)',
    subtitleRu: 'От N-грамм к большим языковым моделям (LLM)',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-llm.svg',
    sections: [
      {
        heading: 'Language Modeling Fundamentals',
        headingRu: 'Основы языкового моделирования',
        blocks: [
          { type: 'text', html: 'A <strong>language model</strong> assigns probabilities to sequences of tokens. The core task is <strong>next-token prediction</strong>: given a context, predict the probability distribution over the next token. This simple objective powers GPT, BERT, and all modern LLMs.', htmlRu: '<strong>Языковая модель</strong> присваивает вероятности последовательностям токенов. Основная задача — <strong>предсказание следующего токена</strong>: по контексту предсказать распределение вероятностей следующего токена. Эта простая цель обеспечивает работу GPT, BERT и всех современных LLM.' },
          { type: 'formula', math: 'P(w_1, \ldots, w_T) = \prod_{t=1}^{T} P(w_t | w_1, \ldots, w_{t-1})', label: 'Autoregressive language model', labelRu: 'Авторегрессионная языковая модель' },
          { type: 'text', html: '<strong>Perplexity</strong> is the standard evaluation metric — the exponential of the average negative log-likelihood. Lower perplexity means the model is more confident and accurate in its predictions.', htmlRu: '<strong>Перплексия</strong> — стандартная метрика оценки — экспонента среднего отрицательного логарифма правдоподобия. Более низкая перплексия означает более уверенные и точные предсказания модели.' },
          { type: 'formula', math: '\text{PPL} = \exp\!\left(-\frac{1}{T}\sum_{t=1}^{T} \log P(w_t | w_{<t})\right)', label: 'Perplexity', labelRu: 'Перплексия' },
        ],
      },
      {
        heading: 'Modern LLMs & Scaling',
        headingRu: 'Современные LLM и масштабирование',
        blocks: [
          { type: 'text', html: 'Modern LLMs are transformer-based models scaled to billions of parameters: <strong>GPT</strong> (autoregressive generation), <strong>BERT</strong> (masked language modeling), <strong>T5</strong> (text-to-text), <strong>LLaMA</strong> (open-source). The <strong>scaling laws</strong> show that larger models trained on more data with more compute consistently improve performance.', htmlRu: 'Современные LLM — модели на основе трансформеров, масштабированные до миллиардов параметров: <strong>GPT</strong> (авторегрессионная генерация), <strong>BERT</strong> (маскированное языковое моделирование), <strong>T5</strong> (текст-в-текст), <strong>LLaMA</strong> (open-source). <strong>Законы масштабирования</strong> показывают, что большие модели, обученные на большем объёме данных с большими вычислениями, последовательно улучшают качество.' },
          { type: 'info', variant: 'emerald', text: 'Key LLM training techniques: RLHF (Reinforcement Learning from Human Feedback) aligns models with human preferences. DPO (Direct Preference Optimization) simplifies this. Constitutional AI adds self-critique.', textRu: 'Ключевые техники обучения LLM: RLHF (обучение с подкреплением по обратной связи от людей) выравнивает модели с человеческими предпочтениями. DPO (прямая оптимизация предпочтений) упрощает это. Constitutional AI добавляет самокритику.' },
          { type: 'text', html: 'Tokenization is the foundation of LLMs. <strong>Byte-Pair Encoding (BPE)</strong> and <strong>SentencePiece</strong> handle any language. <strong>KV-cache</strong> optimizes inference by caching key-value pairs. <strong>Mixture of Experts (MoE)</strong> enables scaling without proportional compute increase.', htmlRu: 'Токенизация — фундамент LLM. <strong>Byte-Pair Encoding (BPE)</strong> и <strong>SentencePiece</strong> работают с любым языком. <strong>KV-кеш</strong> оптимизирует инференс кешированием пар ключ-значение. <strong>Mixture of Experts (MoE)</strong> позволяет масштабировать без пропорционального роста вычислений.' },
          { type: 'info', variant: 'accent', text: 'LLMs exhibit emergent abilities at scale: chain-of-thought reasoning, in-context learning, and code generation. However, they still struggle with factual accuracy, counting, and spatial reasoning.', textRu: 'LLM проявляют эмерджентные способности при масштабировании: цепочка рассуждений, обучение в контексте и генерация кода. Однако они всё ещё испытывают трудности с фактологической точностью, подсчётом и пространственным мышлением.' },
        ],
      },
      {
        heading: 'Applications & Limitations',
        headingRu: 'Применения и ограничения',
        blocks: [
          { type: 'text', html: '<strong>Fine-tuning</strong> adapts a pretrained LLM to a specific task using labeled examples. <strong>Prompt engineering</strong> (few-shot, chain-of-thought) leverages in-context learning without retraining. <strong>RAG</strong> (Retrieval-Augmented Generation) grounds LLM responses in external knowledge bases.', htmlRu: '<strong>Файнтюнинг</strong> адаптирует предобученную LLM к конкретной задаче с помощью размеченных примеров. <strong>Промпт-инженерия</strong> (few-shot, chain-of-thought) использует обучение в контексте без переобучения. <strong>RAG</strong> (генерация с дополненным поиском) основывает ответы LLM на внешних базах знаний.' },
          { type: 'text', html: '<strong>Key limitations</strong>: hallucination (generating plausible but false information), inability to verify their own outputs, context window limits (typically 4K–128K tokens), and high inference costs. Guardrails, fact-checking, and human-in-the-loop are essential for production use.', htmlRu: '<strong>Ключевые ограничения</strong>: галлюцинации (генерация правдоподобной, но ложной информации), неспособность проверять собственные выводы, ограничения контекстного окна (обычно 4K–128K токенов) и высокие затраты инференса. Защитные механизмы, проверка фактов и человек в цикле необходимы для продакшен-использования.' },
          { type: 'formula', math: 'L(\theta) = -\mathbb{E}_{(x,y) \sim D}\left[\sum_{t} \log P_\theta(y_t | y_{<t}, x)\right]', label: 'Language model training objective', labelRu: 'Целевая функция обучения языковой модели' },
          { type: 'info', variant: 'emerald', text: 'Key advances in 2023–2025: mixture-of-experts (Mixtral, GPT-4), long-context models (Gemini 1M tokens), multimodal LLMs (GPT-4V, Gemini), reasoning models (o1, DeepSeek-R1) using chain-of-thought at inference time.', textRu: 'Ключевые достижения 2023–2025: mixture-of-experts (Mixtral, GPT-4), модели длинного контекста (Gemini 1M токенов), мультимодальные LLM (GPT-4V, Gemini), модели рассуждения (o1, DeepSeek-R1) с chain-of-thought во время инференса.' },
        ],
      },
    ],
    conclusion: 'Language models have evolved from simple N-gram statistics to billion-parameter transformers. The scaling laws and RLHF alignment have created models that can generate, reason, and assist across virtually all text-based tasks. RAG, fine-tuning, and guardrails are essential for reliable production deployment.',
    conclusionRu: 'Языковые модели эволюционировали от простой N-граммной статистики до трансформеров с миллиардами параметров. Законы масштабирования и выравнивание RLHF создали модели, способные генерировать, рассуждать и помогать практически во всех текстовых задачах. RAG, файнтюнинг и защитные механизмы необходимы для надёжного продакшен-развертывания.',
    references: [
      { title: 'Scaling Laws for Neural Language Models', authors: 'Kaplan et al., 2020', url: 'https://arxiv.org/abs/2001.08361' },
      { title: 'Языковые модели (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/yazykovye-modeli' },
    ],
  },

  /* ---- 32. Recommender Systems ---- */
  {
    slug: 'recommender-systems',
    title: 'Recommender Systems',
    titleRu: 'Рекомендательные системы',
    subtitle: 'Collaborative Filtering, Matrix Factorization & Content-Based Methods',
    subtitleRu: 'Коллаборативная фильтрация, матричные разложения и контентные методы',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-recommender.svg',
    sections: [
      {
        heading: 'Types of Recommender Systems',
        headingRu: 'Типы рекомендательных систем',
        blocks: [
          { type: 'text', html: 'Recommender systems predict user preferences for items they haven\'t interacted with. <strong>Collaborative filtering</strong> uses user-item interaction patterns. <strong>Content-based</strong> methods use item features (genre, description). <strong>Hybrid</strong> systems combine both.', htmlRu: 'Рекомендательные системы предсказывают предпочтения пользователей для объектов, с которыми они не взаимодействовали. <strong>Коллаборативная фильтрация</strong> использует паттерны взаимодействий пользователь-объект. <strong>Контентные</strong> методы используют признаки объектов (жанр, описание). <strong>Гибридные</strong> системы объединяют оба подхода.' },
          { type: 'formula', math: '\hat{r}_{ui} = \mu + b_u + b_i + p_u^T q_i', label: 'Matrix factorization prediction', labelRu: 'Предсказание матричного разложения' },
          { type: 'text', html: '<strong>Matrix factorization</strong> (SVD, ALS) decomposes the user-item rating matrix into low-rank user and item embeddings. The dot product of these embeddings predicts the rating. This approach won the Netflix Prize.', htmlRu: '<strong>Матричное разложение</strong> (SVD, ALS) раскладывает матрицу оценок пользователь-объект в низкоранговые эмбеддинги пользователей и объектов. Скалярное произведение этих эмбеддингов предсказывает оценку. Этот подход выиграл Netflix Prize.' },
        ],
      },
      {
        heading: 'Modern Approaches',
        headingRu: 'Современные подходы',
        blocks: [
          { type: 'text', html: 'Deep learning enhanced recommenders include <strong>two-tower models</strong> (user and item towers), <strong>sequential recommenders</strong> (SASRec using transformers), and <strong>graph-based</strong> methods (PinSage using GNNs on user-item bipartite graphs).', htmlRu: 'Рекомендательные системы с глубоким обучением включают <strong>двухбашенные модели</strong> (башни пользователя и объекта), <strong>последовательные рекомендатели</strong> (SASRec на трансформерах) и <strong>графовые</strong> методы (PinSage на GNN по двудольным графам пользователь-объект).' },
          { type: 'info', variant: 'emerald', text: 'Evaluation metrics: NDCG (ranking quality), Recall@K (coverage), MRR (first relevant item). Production systems use a cascade: candidate generation → ranking → re-ranking.', textRu: 'Метрики оценки: NDCG (качество ранжирования), Recall@K (покрытие), MRR (первый релевантный объект). В продакшене используется каскад: генерация кандидатов → ранжирование → переранжирование.' },
          { type: 'definition', title: 'Cold Start Problem', titleRu: 'Проблема холодного старта', math: '\text{New user/item: no interactions} \to \text{use content features}', note: 'New users or items have no interaction history. Content-based methods or metadata-based embeddings provide initial recommendations.', noteRu: 'У новых пользователей или объектов нет истории взаимодействий. Контентные методы или эмбеддинги на основе метаданных обеспечивают начальные рекомендации.' },
        ],
      },
      {
        heading: 'Evaluation & Production Systems',
        headingRu: 'Оценка и продакшен-системы',
        blocks: [
          { type: 'text', html: '<strong>Offline evaluation</strong> uses historical data to measure recommendation quality. Key metrics: <strong>NDCG@K</strong> (ranking quality), <strong>Recall@K</strong> (coverage of relevant items), <strong>MRR</strong> (position of first relevant item), and <strong>serendipity</strong> (unexpected but relevant recommendations).', htmlRu: '<strong>Офлайн-оценка</strong> использует исторические данные для измерения качества рекомендаций. Ключевые метрики: <strong>NDCG@K</strong> (качество ранжирования), <strong>Recall@K</strong> (покрытие релевантных объектов), <strong>MRR</strong> (позиция первого релевантного объекта) и <strong>серендипность</strong> (неожиданные, но релевантные рекомендации).' },
          { type: 'text', html: 'Production recommender systems use a <strong>multi-stage cascade</strong>: (1) candidate generation (fast retrieval of ~1000 items from millions using matrix factorization or ANN search), (2) ranking (scoring candidates with a more accurate model), (3) re-ranking (applying business rules, diversity, freshness).', htmlRu: 'Продакшен рекомендательные системы используют <strong>многоэтапный каскад</strong>: (1) генерация кандидатов (быстрый поиск ~1000 объектов из миллионов с помощью матричного разложения или ANN), (2) ранжирование (оценка кандидатов более точной моделью), (3) переранжирование (бизнес-правила, разнообразие, свежесть).' },
          { type: 'formula', math: '\text{NDCG@K} = \frac{\sum_{i=1}^{K} \frac{2^{rel_i}-1}{\log_2(i+1)}}{\text{IDCG@K}}', label: 'NDCG for recommendation evaluation', labelRu: 'NDCG для оценки рекомендаций' },
          { type: 'info', variant: 'emerald', text: 'Implicit feedback (clicks, watch time, purchases) is far more abundant than explicit ratings. Modern systems use implicit signals with Bayesian Personalized Ranking (BPR) or Weighted ALS for training.', textRu: 'Неявная обратная связь (клики, время просмотра, покупки) гораздо обильнее явных оценок. Современные системы используют неявные сигналы с Bayesian Personalized Ranking (BPR) или Weighted ALS для обучения.' },
        ],
      },
    ],
    conclusion: 'Recommender systems power modern platforms from Netflix to Spotify. Matrix factorization provides a strong baseline, while deep learning models with sequential and graph-based features achieve state-of-the-art performance. Production systems use a multi-stage cascade balancing accuracy and latency.',
    conclusionRu: 'Рекомендательные системы обеспечивают работу современных платформ от Netflix до Spotify. Матричное разложение даёт надёжную базу, а модели глубокого обучения с последовательными и графовыми признаками достигают передового качества. Продакшен-системы используют многоэтапный каскад, балансирующий точность и задержку.',
    references: [
      { title: 'Matrix Factorization Techniques for Recommender Systems', authors: 'Koren, Bell, Volinsky, 2009', url: 'https://doi.org/10.1109/MC.2009.263' },
      { title: 'Введение в рекомендательные системы (Хендбук Яндекса)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/vvedenie-v-rekomendatelnye-sistemy' },
    ],
  },

  /* ---- 33. Clustering ---- */
  {
    slug: 'clustering',
    title: 'Clustering',
    titleRu: 'Кластеризация',
    subtitle: 'Unsupervised Grouping with K-Means, DBSCAN & Hierarchical Methods',
    subtitleRu: 'Неконтролируемая группировка: K-Means, DBSCAN и иерархические методы',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-clustering.svg',
    sections: [
      {
        heading: 'K-Means & Centroid Methods',
        headingRu: 'K-Means и центроидные методы',
        blocks: [
          { type: 'text', html: '<strong>K-Means</strong> partitions data into k clusters by iteratively assigning points to the nearest centroid and updating centroids. It minimizes the within-cluster sum of squares (inertia).', htmlRu: '<strong>K-Means</strong> разбивает данные на k кластеров, итеративно назначая точки ближайшему центроиду и обновляя центроиды. Он минимизирует сумму квадратов внутри кластеров (инерцию).' },
          { type: 'formula', math: '\min \sum_{k=1}^{K} \sum_{x_i \in C_k} \|x_i - \mu_k\|^2', label: 'K-Means objective', labelRu: 'Целевая функция K-Means' },
          { type: 'chart', chart: 'scatter', title: 'K-Means Convergence Animation', titleRu: 'Анимация сходимости K-Means', description: 'Watch clusters form as centroids update', descriptionRu: 'Наблюдайте, как формируются кластеры при обновлении центроидов', interactive: true },
          { type: 'info', variant: 'amber', text: 'K-Means assumes spherical clusters of similar size. It fails on elongated, nested, or variable-density clusters. Use DBSCAN or spectral clustering for these cases.', textRu: 'K-Means предполагает сферические кластеры похожего размера. Он не работает с вытянутыми, вложенными или кластерами переменной плотности. Используйте DBSCAN или спектральную кластеризацию.' },
        ],
      },
      {
        heading: 'DBSCAN & Hierarchical Clustering',
        headingRu: 'DBSCAN и иерархическая кластеризация',
        blocks: [
          { type: 'text', html: '<strong>DBSCAN</strong> finds density-connected clusters — groups of points with many neighbors within radius ε. It handles arbitrary shapes and identifies noise points (outliers). No need to specify k.', htmlRu: '<strong>DBSCAN</strong> находит плотно связанные кластеры — группы точек с множеством соседей в радиусе ε. Он работает с произвольными формами и определяет шумовые точки (выбросы). Не нужно задавать k.' },
          { type: 'definition', title: 'Silhouette Score', titleRu: 'Силуэтный коэффициент', math: 's(i) = \frac{b(i) - a(i)}{\max(a(i), b(i))}, \quad s \in [-1, 1]', note: 'Measures how similar a point is to its own cluster vs. the nearest cluster. Values near 1 indicate well-separated clusters.', noteRu: 'Измеряет, насколько точка похожа на свой кластер vs. ближайший кластер. Значения ближе к 1 указывают на хорошо разделённые кластеры.' },
          { type: 'info', variant: 'emerald', text: 'Choosing the right method: K-Means for spherical clusters, DBSCAN for noise + arbitrary shapes, hierarchical clustering for dendrogram analysis, spectral clustering for complex manifolds.', textRu: 'Выбор метода: K-Means для сферических кластеров, DBSCAN для шума + произвольных форм, иерархическая для анализа дендрограмм, спектральная для сложных многообразий.' },
        ],
      },
      {
        heading: 'Spectral Clustering & Choosing K',
        headingRu: 'Спектральная кластеризация и выбор K',
        blocks: [
          { type: 'text', html: '<strong>Spectral clustering</strong> transforms data into a low-dimensional space using eigenvectors of the affinity (similarity) matrix, then applies K-Means. It excels at finding clusters on complex manifolds where K-Means fails.', htmlRu: '<strong>Спектральная кластеризация</strong> преобразует данные в низкоразмерное пространство с помощью собственных векторов матрицы аффинности (сходства), затем применяет K-Means. Она отлично находит кластеры на сложных многообразиях, где K-Means не справляется.' },
          { type: 'formula', math: 'L = D - W, \quad \text{solve } Lv = \lambda v \text{ for smallest eigenvalues}', label: 'Graph Laplacian for spectral clustering', labelRu: 'Графовый лапласиан для спектральной кластеризации' },
          { type: 'text', html: 'Choosing the number of clusters: the <strong>elbow method</strong> plots inertia vs. K and looks for the bend. The <strong>silhouette method</strong> maximizes the average silhouette score. The <strong>gap statistic</strong> compares inertia to a null reference distribution.', htmlRu: 'Выбор числа кластеров: <strong>метод локтя</strong> строит график инерции vs. K и ищет изгиб. <strong>Метод силуэта</strong> максимизирует средний силуэтный коэффициент. <strong>Статистика разрыва</strong> сравнивает инерцию с нулевым опорным распределением.' },
          { type: 'info', variant: 'accent', text: 'Modern approaches: HDBSCAN (hierarchical DBSCAN) automatically finds clusters of varying density without specifying K. It\'s the recommended default for exploratory clustering in scikit-learn.', textRu: 'Современные подходы: HDBSCAN (иерархический DBSCAN) автоматически находит кластеры переменной плотности без указания K. Это рекомендуемый выбор по умолчанию для исследовательской кластеризации в scikit-learn.' },
        ],
      },
    ],
    conclusion: 'Clustering is a fundamental unsupervised technique for discovering structure in unlabeled data. The choice of algorithm depends on cluster shape, noise tolerance, and the need to specify k. HDBSCAN and spectral clustering handle complex real-world data better than basic K-Means.',
    conclusionRu: 'Кластеризация — фундаментальный неконтролируемый метод для обнаружения структуры в немаркированных данных. Выбор алгоритма зависит от формы кластеров, устойчивости к шуму и необходимости задавать k. HDBSCAN и спектральная кластеризация лучше справляются со сложными реальными данными.',
    references: [
      { title: 'A Density-Based Algorithm for Discovering Clusters (DBSCAN)', authors: 'Ester et al., 1996', url: 'https://www.aaai.org/Papers/KDD/1996/KDD96-037' },
      { title: 'Кластеризация (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/klasterizaciya' },
    ],
  },

  /* ---- 34. Time Series & ARIMA ---- */
  {
    slug: 'time-series',
    title: 'Time Series & ARIMA',
    titleRu: 'Временные ряды и ARIMA',
    subtitle: 'Forecasting with Trend, Seasonality & Autoregressive Models',
    subtitleRu: 'Прогнозирование с трендом, сезонностью и авторегрессионными моделями',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-timeseries.svg',
    sections: [
      {
        heading: 'Time Series Components',
        headingRu: 'Компоненты временных рядов',
        blocks: [
          { type: 'text', html: 'A time series decomposes into <strong>trend</strong> (long-term direction), <strong>seasonality</strong> (repeating patterns), and <strong>residuals</strong> (irregular noise). Stationarity — constant mean and variance over time — is a key assumption for classical models.', htmlRu: 'Временной ряд раскладывается на <strong>тренд</strong> (долгосрочное направление), <strong>сезонность</strong> (повторяющиеся паттерны) и <strong>остатки</strong> (нерегулярный шум). Стационарность — постоянное среднее и дисперсия — ключевое допущение классических моделей.' },
          { type: 'formula', math: 'y_t = T_t + S_t + R_t', label: 'Additive decomposition', labelRu: 'Аддитивная декомпозиция' },
          { type: 'chart', chart: 'line', title: 'Time Series Decomposition', titleRu: 'Декомпозиция временного ряда', description: 'Original series with trend, seasonal, and residual components', descriptionRu: 'Исходный ряд с компонентами тренда, сезонности и остатков', interactive: true },
          { type: 'definition', title: 'ADF Test (Stationarity)', titleRu: 'Тест ADF (стационарность)', math: 'H_0: \text{unit root exists (non-stationary)}', note: 'p-value < 0.05 rejects non-stationarity. Non-stationary series require differencing before modeling.', noteRu: 'p-value < 0.05 отклоняет нестационарность. Нестационарные ряды требуют дифференцирования перед моделированием.' },
        ],
      },
      {
        heading: 'ARIMA Models',
        headingRu: 'Модели ARIMA',
        blocks: [
          { type: 'text', html: '<strong>ARIMA(p, d, q)</strong> combines three components: <strong>AR(p)</strong> — autoregression on p past values, <strong>I(d)</strong> — d differences to achieve stationarity, <strong>MA(q)</strong> — moving average of q past errors. SARIMA adds seasonal terms.', htmlRu: '<strong>ARIMA(p, d, q)</strong> объединяет три компонента: <strong>AR(p)</strong> — авторегрессия на p прошлых значениях, <strong>I(d)</strong> — d разностей для стационарности, <strong>MA(q)</strong> — скользящее среднее q прошлых ошибок. SARIMA добавляет сезонные члены.' },
          { type: 'formula', math: '\text{ARIMA}(p,d,q): \phi(B)(1-B)^d y_t = \theta(B)\epsilon_t', label: 'ARIMA model', labelRu: 'Модель ARIMA' },
          { type: 'info', variant: 'emerald', text: 'For modern forecasting, gradient boosted trees (with lag features) and transformer-based models often outperform classical ARIMA on large datasets. Prophet (Meta) handles seasonality automatically.', textRu: 'Для современного прогнозирования градиентный бустинг (с лаговыми признаками) и модели на основе трансформеров часто превосходят классическую ARIMA на больших данных. Prophet (Meta) автоматически обрабатывает сезонность.' },
        ],
      },
      {
        heading: 'Modern Forecasting & Exponential Smoothing',
        headingRu: 'Современное прогнозирование и экспоненциальное сглаживание',
        blocks: [
          { type: 'text', html: '<strong>Exponential smoothing</strong> (ETS) assigns exponentially decreasing weights to past observations. Holt-Winters extends this with trend and seasonal components. It\'s fast, interpretable, and competitive with ARIMA for many business forecasting tasks.', htmlRu: '<strong>Экспоненциальное сглаживание</strong> (ETS) присваивает экспоненциально убывающие веса прошлым наблюдениям. Холт-Уинтерс расширяет его трендовыми и сезонными компонентами. Оно быстрое, интерпретируемое и конкурентоспособное с ARIMA для многих бизнес-задач прогнозирования.' },
          { type: 'formula', math: '\hat{y}_{t+h} = l_t + h \cdot b_t + s_{t+h-m}', label: 'Holt-Winters additive forecast', labelRu: 'Аддитивный прогноз Холт-Уинтерс' },
          { type: 'text', html: '<strong>Deep learning for time series</strong>: LSTM networks capture long-range temporal dependencies. Transformer-based models (TFT, Informer, PatchTST) handle very long sequences. N-BEATS and N-HiTS are purpose-built neural forecasting architectures.', htmlRu: '<strong>Глубокое обучение для временных рядов</strong>: LSTM-сети захватывают долгосрочные временные зависимости. Модели на основе трансформеров (TFT, Informer, PatchTST) работают с очень длинными последовательностями. N-BEATS и N-HiTS — специализированные нейронные архитектуры прогнозирования.' },
          { type: 'info', variant: 'accent', text: 'Feature engineering for ML models: lag features (y_{t-1}, y_{t-7}), rolling statistics (mean, std over windows), calendar features (day of week, month), and Fourier terms for seasonality. CatBoost and LightGBM with these features often beat pure time-series models.', textRu: 'Инженерия признаков для ML-моделей: лаговые признаки (y_{t-1}, y_{t-7}), скользящие статистики (среднее, std по окнам), календарные признаки (день недели, месяц) и члены Фурье для сезонности. CatBoost и LightGBM с этими признаками часто превосходят чистые модели временных рядов.' },
        ],
      },
    ],
    conclusion: 'Time series analysis combines classical statistics (ARIMA, exponential smoothing) with modern ML. Understanding stationarity, seasonality, and the train/test split for temporal data is essential. Modern ML with engineered features often outperforms classical approaches on large datasets.',
    conclusionRu: 'Анализ временных рядов объединяет классическую статистику (ARIMA, экспоненциальное сглаживание) с современным ML. Понимание стационарности, сезонности и разбиения на обучающую/тестовую выборки для временных данных необходимо. Современный ML с инженерными признаками часто превосходит классические подходы на больших данных.',
    references: [
      { title: 'Time Series Analysis', authors: 'James Hamilton', url: 'https://press.princeton.edu/books/hardcover/9780691219424/time-series-analysis' },
      { title: 'Временные ряды (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/vremennye-ryady' },
    ],
  },

  /* ---- 35. Ranking ---- */
  {
    slug: 'ranking',
    title: 'Learning to Rank',
    titleRu: 'Задача ранжирования',
    subtitle: 'Pointwise, Pairwise & Listwise Approaches with NDCG',
    subtitleRu: 'Поточечный, попарный и списочный подходы с NDCG',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-ranking.svg',
    sections: [
      {
        heading: 'The Ranking Problem',
        headingRu: 'Задача ранжирования',
        blocks: [
          { type: 'text', html: 'In ranking tasks, the goal is not to predict individual labels but to produce a <strong>correct ordering</strong> of items. Search engines, product recommendations, and ad placement are classic ranking problems.', htmlRu: 'В задачах ранжирования цель — не предсказать отдельные метки, а построить <strong>правильный порядок</strong> объектов. Поисковые системы, рекомендации товаров и размещение рекламы — классические задачи ранжирования.' },
          { type: 'text', html: 'Three approaches: <strong>Pointwise</strong> (treat each item independently — regression/classification), <strong>Pairwise</strong> (learn from pairs of items — which should rank higher), and <strong>Listwise</strong> (optimize the entire ranking list directly).', htmlRu: 'Три подхода: <strong>Поточечный</strong> (каждый объект независимо — регрессия/классификация), <strong>Попарный</strong> (обучение на парах объектов — какой должен быть выше) и <strong>Списочный</strong> (оптимизация всего списка ранжирования напрямую).' },
          { type: 'formula', math: '\text{DCG@k} = \sum_{i=1}^{k} \frac{2^{rel_i} - 1}{\log_2(i+1)}', label: 'Discounted Cumulative Gain', labelRu: 'Дисконтированная накопленная выгода' },
          { type: 'definition', title: 'NDCG (Normalized DCG)', titleRu: 'NDCG (нормированный DCG)', math: '\text{NDCG@k} = \frac{\text{DCG@k}}{\text{IDCG@k}}, \quad \text{NDCG} \in [0, 1]', note: 'NDCG measures ranking quality relative to the ideal ranking. It rewards relevant items appearing early in the list.', noteRu: 'NDCG измеряет качество ранжирования относительно идеального. Он награждает релевантные объекты, появляющиеся в начале списка.' },
        ],
      },
      {
        heading: 'GBDT for Ranking',
        headingRu: 'GBDT для ранжирования',
        blocks: [
          { type: 'text', html: 'Gradient Boosting is the standard approach for ranking. Libraries like <strong>LambdaMART</strong> (LambdaRank + MART) optimize NDCG directly using pairwise lambda gradients. CatBoost supports ranking with its YetiRank and PairLogit loss functions.', htmlRu: 'Градиентный бустинг — стандартный подход для ранжирования. Библиотеки вроде <strong>LambdaMART</strong> (LambdaRank + MART) оптимизируют NDCG напрямую через попарные лямбда-градиенты. CatBoost поддерживает ранжирование с функциями потерь YetiRank и PairLogit.' },
          { type: 'info', variant: 'accent', text: 'Search ranking at Yandex and Google uses GBDT-based models. Each query-document pair gets features (BM25, PageRank, click-through rate), and the model learns to rank documents by relevance.', textRu: 'Поисковое ранжирование в Яндексе и Google использует модели на основе GBDT. Каждая пара запрос-документ получает признаки (BM25, PageRank, частота кликов), и модель учится ранжировать документы по релевантности.' },
        ],
      },
      {
        heading: 'Neural Ranking & Transformers',
        headingRu: 'Нейронное ранжирование и трансформеры',
        blocks: [
          { type: 'text', html: '<strong>Neural re-ranking</strong> uses cross-encoder models (BERT, T5) that take the full query-document pair and predict relevance. These are more accurate than GBDT but too slow for first-stage retrieval — they work as second-stage re-rankers.', htmlRu: '<strong>Нейронное переранжирование</strong> использует кросс-энкодер модели (BERT, T5), принимающие полную пару запрос-документ и предсказывающие релевантность. Они точнее GBDT, но слишком медленны для первичного поиска — работают как переранжировщики второго этапа.' },
          { type: 'text', html: '<strong>Dense retrieval</strong> (DPR, ColBERT) uses bi-encoder models to embed queries and documents into a shared vector space. Approximate nearest neighbor (ANN) search enables fast retrieval from billions of documents.', htmlRu: '<strong>Плотный поиск</strong> (DPR, ColBERT) использует би-энкодер модели для встраивания запросов и документов в общее векторное пространство. Приближённый поиск ближайших соседей (ANN) обеспечивает быстрый поиск среди миллиардов документов.' },
          { type: 'formula', math: '\text{score}(q, d) = \text{cosine}(E_q(q), E_d(d)) = \frac{E_q(q) \cdot E_d(d)}{\|E_q(q)\| \|E_d(d)\|}', label: 'Dense retrieval scoring', labelRu: 'Оценка плотного поиска' },
          { type: 'info', variant: 'emerald', text: 'Modern search pipelines: (1) sparse retrieval (BM25) + dense retrieval (DPR) in parallel, (2) fusion of results, (3) cross-encoder re-ranking of top-100, (4) presentation with snippets and rich results.', textRu: 'Современные поисковые пайплайны: (1) разреженный поиск (BM25) + плотный поиск (DPR) параллельно, (2) слияние результатов, (3) кросс-энкодер переранжирование top-100, (4) представление со сниппетами и расширенными результатами.' },
        ],
      },
      {
        heading: 'Ranking Loss Functions & Evaluation',
        headingRu: 'Функции потерь ранжирования и оценка',
        blocks: [
          { type: 'text', html: '<strong>LambdaRank</strong> weights pairwise gradients by the change in NDCG that would result from swapping two documents. This directly optimizes the ranking metric rather than a proxy loss. <strong>ApproxNDCG</strong> provides a smooth, differentiable approximation of NDCG for end-to-end training.', htmlRu: '<strong>LambdaRank</strong> взвешивает попарные градиенты по изменению NDCG, которое произошло бы при перестановке двух документов. Это напрямую оптимизирует метрику ранжирования, а не прокси-потерю. <strong>ApproxNDCG</strong> обеспечивает гладкую дифференцируемую аппроксимацию NDCG для сквозного обучения.' },
          { type: 'formula', math: '\lambda_{ij} = \frac{\partial \text{NDCG}}{\partial s_i} = \frac{\partial C}{\partial s_i} \cdot |\Delta \text{NDCG}_{ij}|', label: 'LambdaRank gradient weighting', labelRu: 'Взвешивание градиента LambdaRank' },
          { type: 'text', html: '<strong>Position bias</strong> is a major challenge: users click more on top results regardless of relevance. <strong>Inverse propensity weighting</strong> and <strong>click models</strong> correct for this bias to learn true relevance from click data.', htmlRu: '<strong>Позиционное смещение</strong> — серьёзный вызов: пользователи чаще кликают на верхние результаты независимо от релевантности. <strong>Обратно-пропорциональное взвешивание</strong> и <strong>модели кликов</strong> корректируют это смещение для обучения истинной релевантности из данных кликов.' },
          { type: 'info', variant: 'accent', text: 'Evaluation beyond NDCG: ERR (Expected Reciprocal Rank) models user satisfaction, MRR focuses on the first relevant result, and MAP (Mean Average Precision) averages precision across all recall levels.', textRu: 'Оценка за рамками NDCG: ERR (ожидаемый взаимный ранг) моделирует удовлетворённость пользователя, MRR фокусируется на первом релевантном результате, MAP (средняя точность) усредняет точность по всем уровням полноты.' },
        ],
      },
    ],
    conclusion: 'Learning to Rank transforms classification into ordering. NDCG is the gold standard metric, and gradient boosting with pairwise losses is the dominant approach in production search and recommendation systems. Neural re-rankers, dense retrieval, and bias correction are increasingly supplementing GBDT-based pipelines.',
    conclusionRu: 'Обучение ранжированию преобразует классификацию в упорядочение. NDCG — золотой стандарт метрики, а градиентный бустинг с попарными потерями — доминирующий подход в продакшен-системах поиска и рекомендаций. Нейронные переранжировщики и плотный поиск всё больше дополняют GBDT-пайплайны.',
    references: [
      { title: 'From RankNet to LambdaRank to LambdaMART', authors: 'Christopher Burges, 2010', url: 'https://www.microsoft.com/en-us/research/publication/from-ranknet-to-lambdarank-to-lambdamart-an-overview/' },
      { title: 'Задача ранжирования (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/zadacha-ranzhirovaniya' },
    ],
  },

  /* ---- 36. Knowledge Distillation ---- */
  {
    slug: 'knowledge-distillation',
    title: 'Knowledge Distillation',
    titleRu: 'Дистилляция знаний',
    subtitle: 'Compressing Large Models into Smaller Ones',
    subtitleRu: 'Сжатие больших моделей в меньшие',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-distillation.svg',
    sections: [
      {
        heading: 'Teacher-Student Framework',
        headingRu: 'Фреймворк учитель-ученик',
        blocks: [
          { type: 'text', html: '<strong>Knowledge distillation</strong> transfers knowledge from a large, complex <strong>teacher model</strong> to a smaller, efficient <strong>student model</strong>. The student learns to mimic the teacher\'s output distribution (soft labels), not just the hard class labels.', htmlRu: '<strong>Дистилляция знаний</strong> передаёт знания от большой сложной <strong>модели-учителя</strong> к меньшей эффективной <strong>модели-ученику</strong>. Ученик учится воспроизводить распределение выхода учителя (мягкие метки), а не только жёсткие метки классов.' },
          { type: 'formula', math: 'L_{KD} = \alpha \cdot L_{CE}(y, \hat{y}) + (1-\alpha) \cdot T^2 \cdot D_{KL}(\sigma(z_t/T) \| \sigma(z_s/T))', label: 'Distillation loss', labelRu: 'Функция потерь дистилляции' },
          { type: 'text', html: 'The <strong>temperature</strong> T > 1 softens the teacher\'s probability distribution, revealing the "dark knowledge" — the relative ordering of incorrect classes that the teacher learned. This soft information is what makes distillation so effective.', htmlRu: '<strong>Температура</strong> T > 1 смягчает распределение вероятностей учителя, раскрывая «тёмное знание» — относительный порядок некорректных классов, который учитель выучил. Эта мягкая информация делает дистилляцию столь эффективной.' },
        ],
      },
      {
        heading: 'Beyond Logits: Modern Distillation',
        headingRu: 'За пределами логитов: современная дистилляция',
        blocks: [
          { type: 'text', html: 'Modern distillation transfers more than logits: <strong>feature distillation</strong> (intermediate representations), <strong>attention transfer</strong> (attention maps), <strong>relational distillation</strong> (relationships between samples), and <strong>self-distillation</strong> (model distills into itself across epochs).', htmlRu: 'Современная дистилляция передаёт больше, чем логиты: <strong>дистилляция признаков</strong> (промежуточные представления), <strong>перенос внимания</strong> (карты внимания), <strong>реляционная дистилляция</strong> (отношения между примерами) и <strong>самодистилляция</strong> (модель дистиллирует себя через эпохи).' },
          { type: 'info', variant: 'emerald', text: 'Distillation is key for deploying LLMs on edge devices. DistilBERT retains 97% of BERT\'s performance with 40% fewer parameters and 60% faster inference. TinyBERT and MobileBERT push further.', textRu: 'Дистилляция — ключ к развертыванию LLM на edge-устройствах. DistilBERT сохраняет 97% качества BERT при на 40% меньшем числе параметров и на 60% более быстром инференсе. TinyBERT и MobileBERT идут ещё дальше.' },
          { type: 'info', variant: 'accent', text: 'In LLM distillation, smaller models (Phi, Gemma) are trained on outputs of larger models (GPT-4, Claude). This creates capable small models that run on phones and laptops.', textRu: 'В дистилляции LLM меньшие модели (Phi, Gemma) обучаются на выходах больших моделей (GPT-4, Claude). Это создаёт способные маленькие модели, работающие на телефонах и ноутбуках.' },
        ],
      },
      {
        heading: 'Quantization & Pruning',
        headingRu: 'Квантизация и прунинг',
        blocks: [
          { type: 'text', html: '<strong>Quantization</strong> reduces model precision (FP32 → FP16 → INT8 → INT4) to shrink model size and speed up inference. <strong>Post-training quantization</strong> (PTQ) requires no retraining, while <strong>quantization-aware training</strong> (QAT) simulates low-precision arithmetic during training for better accuracy.', htmlRu: '<strong>Квантизация</strong> снижает точность модели (FP32 → FP16 → INT8 → INT4) для уменьшения размера и ускорения инференса. <strong>Пост-обучающая квантизация</strong> (PTQ) не требует переобучения, тогда как <strong>квантизационно-осознанное обучение</strong> (QAT) имитирует низкоточную арифметику во время обучения для лучшей точности.' },
          { type: 'formula', math: 'x_q = \text{round}\left(\frac{x}{s}\right) + z, \quad x_{dq} = s \cdot (x_q - z)', label: 'Affine quantization / dequantization', labelRu: 'Аффинная квантизация / деквантизация' },
          { type: 'text', html: '<strong>Pruning</strong> removes unimportant weights or neurons. <strong>Unstructured pruning</strong> zeros individual weights (high sparsity but needs specialized hardware). <strong>Structured pruning</strong> removes entire channels, heads, or layers — directly reducing model size and compute.', htmlRu: '<strong>Прунинг</strong> удаляет неважные веса или нейроны. <strong>Неструктурированный прунинг</strong> обнуляет отдельные веса (высокая разреженность, но нужно специализированное железо). <strong>Структурированный прунинг</strong> удаляет целые каналы, головы или слои — напрямую уменьшая размер модели и вычисления.' },
          { type: 'info', variant: 'emerald', text: 'Combined pipeline: train a large teacher → distill to a smaller student → quantize to INT8 → prune 30-50% of weights. GPTQ and AWQ enable 4-bit quantization of LLMs with minimal quality loss.', textRu: 'Комбинированный пайплайн: обучить большого учителя → дистиллировать в меньшего ученика → квантизовать в INT8 → обрезать 30-50% весов. GPTQ и AWQ позволяют 4-битную квантизацию LLM с минимальной потерей качества.' },
        ],
      },
    ],
    conclusion: 'Knowledge distillation enables deploying powerful models at reduced cost. By transferring soft labels, intermediate features, and structural knowledge, small students can closely match large teachers. Combined with quantization and pruning, it forms a complete model compression toolkit.',
    conclusionRu: 'Дистилляция знаний позволяет развертывать мощные модели с уменьшенными затратами. Передавая мягкие метки, промежуточные признаки и структурные знания, маленькие ученики могут близко приближаться к большим учителям. Вместе с квантизацией и прунингом она формирует полный набор инструментов сжатия моделей.',
    references: [
      { title: 'Distilling the Knowledge in a Neural Network', authors: 'Hinton, Vinyals, Dean, 2015', url: 'https://arxiv.org/abs/1503.02531' },
      { title: 'Дистилляция знаний (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/distillyaciya-znanij' },
    ],
  },

  /* ---- 37. Optimization in ML ---- */
  {
    slug: 'optimization',
    title: 'Optimization in Machine Learning',
    titleRu: 'Оптимизация в машинном обучении',
    subtitle: 'From Gradient Descent to Adam and Beyond',
    subtitleRu: 'От градиентного спуска до Adam и далее',
    authors: 'Yandex ML Handbook',
    date: 'June 2026',
    thumbnail: '/thumbnails/thumbnail-optimization.svg',
    sections: [
      {
        heading: 'Gradient Descent (GD)',
        headingRu: 'Градиентный спуск (GD)',
        blocks: [
          { type: 'text', html: 'Gradient descent finds the minimum of a function by iteratively moving in the direction of steepest descent — the <strong>negative gradient</strong>. The step size is controlled by the <strong>learning rate</strong> η.', htmlRu: 'Градиентный спуск находит минимум функции, итеративно двигаясь в направлении наискорейшего убывания — <strong>антиградиенту</strong>. Размер шага контролируется <strong>темпом обучения</strong> η.' },
          { type: 'formula', math: 'w_{t+1} = w_t - \eta \nabla L(w_t)', label: 'Gradient descent update', labelRu: 'Обновление градиентного спуска' },
          { type: 'definition', title: 'Convexity', titleRu: 'Выпуклость', math: 'f(\lambda x + (1-\lambda)y) \leq \lambda f(x) + (1-\lambda) f(y)', note: 'For convex functions, any local minimum is also global. Linear regression with MSE is convex; neural network loss is not.', noteRu: 'Для выпуклых функций любой локальный минимум является глобальным. Линейная регрессия с MSE выпукла; функция потерь нейронной сети — нет.' },
          { type: 'info', variant: 'accent', text: 'Convergence rate for convex case: O(1/T) steps. For smooth + strongly convex: O(κ log(1/ε)) where κ is the condition number. For non-convex: O(1/ε²) to reach ‖∇f‖ ≤ ε.', textRu: 'Скорость сходимости для выпуклого случая: O(1/T) шагов. Для гладкого + сильно выпуклого: O(κ log(1/ε)), где κ — число обусловленности. Для невыпуклого: O(1/ε²) для достижения ‖∇f‖ ≤ ε.' },
        ],
      },
      {
        heading: 'Stochastic Gradient Descent (SGD)',
        headingRu: 'Стохастический градиентный спуск (SGD)',
        blocks: [
          { type: 'text', html: 'Instead of computing gradients over the entire dataset, <strong>SGD</strong> uses random mini-batches, making training feasible on large datasets. The gradient is estimated as an unbiased Monte Carlo sample.', htmlRu: 'Вместо вычисления градиентов по всему набору данных <strong>SGD</strong> использует случайные мини-батчи, что делает обучение возможным на больших данных. Градиент оценивается как несмещённая оценка Монте-Карло.' },
          { type: 'formula', math: 'w_{t+1} = w_t - \eta \cdot \frac{1}{|B|} \sum_{i \in B} \nabla \ell_i(w_t)', label: 'SGD update with mini-batch B', labelRu: 'Обновление SGD с мини-батчом B' },
          { type: 'info', variant: 'emerald', text: 'Larger batches give lower-variance gradient estimates but may lead to sharper minima that generalize worse. The "generalization gap" phenomenon shows that very large batches can hurt test accuracy.', textRu: 'Большие батчи дают оценки градиента с меньшей дисперсией, но могут приводить к более острым минимумам, которые хуже обобщаются. Феномен «разрыва обобщения» показывает, что очень большие батчи могут ухудшить качество на тесте.' },
        ],
      },
      {
        heading: 'Momentum & Nesterov Acceleration',
        headingRu: 'Момент и ускорение Нестерова',
        blocks: [
          { type: 'text', html: 'Momentum accumulates a "velocity" vector that smooths the optimization trajectory, helping escape shallow local minima and saddle points. Think of a ball rolling down a hill with inertia.', htmlRu: 'Момент накапливает вектор «скорости», сглаживающий траекторию оптимизации, помогая выйти из мелких локальных минимумов и седловых точек. Представьте мяч, катящийся с горы с инерцией.' },
          { type: 'formula', math: 'v_{t+1} = \mu v_t + \eta \nabla L(w_t), \quad w_{t+1} = w_t - v_{t+1}', label: 'Classical momentum', labelRu: 'Классический момент' },
          { type: 'text', html: '<strong>Nesterov momentum</strong> evaluates the gradient at the "lookahead" position, giving better theoretical convergence for convex problems: O(√κ log(1/ε)) vs O(κ log(1/ε)) for plain GD.', htmlRu: '<strong>Момент Нестерова</strong> вычисляет градиент в «опережающей» позиции, давая лучшую теоретическую сходимость для выпуклых задач: O(√κ log(1/ε)) против O(κ log(1/ε)) для обычного GD.' },
          { type: 'formula', math: 'v_{t+1} = \mu v_t + \eta \nabla L(w_t - \mu v_t), \quad w_{t+1} = w_t - v_{t+1}', label: 'Nesterov momentum', labelRu: 'Момент Нестерова' },
        ],
      },
      {
        heading: 'Adaptive Learning Rates: AdaGrad → RMSProp → Adam',
        headingRu: 'Адаптивные темпы обучения: AdaGrad → RMSProp → Adam',
        blocks: [
          { type: 'text', html: '<strong>AdaGrad</strong> divides the learning rate per-parameter by the square root of the sum of historical squared gradients. It works well for sparse features but the learning rate may shrink too fast.', htmlRu: '<strong>AdaGrad</strong> делит темп обучения по каждому параметру на корень из суммы исторических квадратов градиентов. Хорошо работает для разреженных признаков, но темп обучения может уменьшаться слишком быстро.' },
          { type: 'text', html: '<strong>RMSProp</strong> fixes AdaGrad\'s aggressive decay by using an exponential moving average of squared gradients instead of a cumulative sum.', htmlRu: '<strong>RMSProp</strong> исправляет агрессивное затухание AdaGrad, используя экспоненциальное скользящее среднее квадратов градиентов вместо кумулятивной суммы.' },
          { type: 'formula', math: 'v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2, \quad w_{t+1} = w_t - \frac{\eta}{\sqrt{v_t} + \varepsilon} g_t', label: 'RMSProp update', labelRu: 'Обновление RMSProp' },
          { type: 'text', html: '<strong>Adam</strong> (ADAptive Momentum) combines momentum and RMSProp: it tracks both a first-moment estimate (mean) and a second-moment estimate (variance) of the gradients.', htmlRu: '<strong>Adam</strong> (ADAptive Momentum) объединяет момент и RMSProp: отслеживает оценку первого момента (среднее) и оценку второго момента (дисперсию) градиентов.' },
          { type: 'formula', math: 'm_t = \beta_1 m_{t-1} + (1-\beta_1)g_t, \quad v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^2', label: 'Adam: first and second moment estimates', labelRu: 'Adam: оценки первого и второго моментов' },
          { type: 'info', variant: 'accent', text: 'Default Adam hyperparameters: β₁=0.9, β₂=0.999, ε=1e-8. The learning rate is the main tuning parameter. A common starting point is lr=3e-4 ("Karpathy constant").', textRu: 'Гиперпараметры Adam по умолчанию: β₁=0.9, β₂=0.999, ε=1e-8. Темп обучения — основной параметр для настройки. Распространённое начальное значение: lr=3e-4 («константа Карпати»).' },
        ],
      },
      {
        heading: 'AdamW, SWA & Practical Tips',
        headingRu: 'AdamW, SWA и практические советы',
        blocks: [
          { type: 'text', html: '<strong>AdamW</strong> decouples weight decay from the adaptive gradient update, applying L2 regularization directly to weights. This improves generalization compared to standard Adam.', htmlRu: '<strong>AdamW</strong> разделяет затухание весов и адаптивное обновление градиента, применяя L2-регуляризацию напрямую к весам. Это улучшает обобщающую способность по сравнению со стандартным Adam.' },
          { type: 'formula', math: 'w_{t+1} = w_t - \eta(\hat{m}_t / (\sqrt{\hat{v}_t} + \varepsilon) + \lambda w_t)', label: 'AdamW: decoupled weight decay', labelRu: 'AdamW: развязанное затухание весов' },
          { type: 'text', html: '<strong>Stochastic Weight Averaging (SWA)</strong> averages model weights across training epochs, finding wider minima that generalize better. Simply average weights from epoch checkpoints.', htmlRu: '<strong>Усреднение стохастических весов (SWA)</strong> усредняет веса модели по эпохам обучения, находя более широкие минимумы, которые лучше обобщаются. Просто усредняйте веса из чекпоинтов эпох.' },
          { type: 'text', html: '<strong>Learning rate schedules</strong>: warmup + cosine decay is widely used (especially for transformers). LARS/LAMB optimizers enable training with very large batch sizes across multiple GPUs.', htmlRu: '<strong>Расписания темпа обучения</strong>: warmup + косинусное затухание широко используется (особенно для трансформеров). Оптимизаторы LARS/LAMB позволяют обучение с очень большими батчами на нескольких GPU.' },
          { type: 'info', variant: 'emerald', text: 'Key insight from the Yandex ML Handbook: in non-convex optimization, SGD often converges to "wide" minima that generalize well, while large-batch optimizers tend toward sharp minima. SWA helps recover wide minima regardless of batch size.', textRu: 'Ключевой инсайт из Хендбука Яндекса по ML: в невыпуклой оптимизации SGD часто сходится к «широким» минимумам, которые хорошо обобщаются, тогда как оптимизаторы с большими батчами склонны к острым минимумам. SWA помогает найти широкий минимум независимо от размера батча.' },
        ],
      },
    ],
    conclusion: 'Optimization is the engine of machine learning. From vanilla GD through SGD with momentum to adaptive methods like Adam and AdamW, each algorithm makes trade-offs between convergence speed, stability, and generalization. Modern techniques like SWA, warmup schedules, and layer-wise adaptation (LARS/LAMB) push the boundaries further.',
    conclusionRu: 'Оптимизация — двигатель машинного обучения. От простого GD через SGD с моментом до адаптивных методов Adam и AdamW — каждый алгоритм балансирует между скоростью сходимости, стабильностью и обобщением. Современные методы SWA, расписания warmup и послойная адаптация (LARS/LAMB) раздвигают границы возможного.',
    references: [
      { title: 'Adam: A Method for Stochastic Optimization', authors: 'Kingma, Ba, 2014', url: 'https://arxiv.org/abs/1412.6980' },
      { title: 'Averaging Weights Leads to Wider Optima and Better Generalization', authors: 'Izmailov et al., 2018 (SWA)', url: 'https://arxiv.org/abs/1803.05407' },
      { title: 'Оптимизация в ML (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/optimizaciya-v-ml' },
    ],
  },

  /* ---- 38. Representation Learning ---- */
  {
    slug: 'representation-learning',
    title: 'Representation Learning',
    titleRu: 'Обучение представлений',
    subtitle: 'Self-Supervised Learning, Contrastive Methods & Transfer Strategies',
    subtitleRu: 'Самообучение, контрастные методы и стратегии переноса',
    authors: 'Yandex ML Handbook',
    date: 'June 2026',
    thumbnail: '/thumbnails/thumbnail-representation.svg',
    sections: [
      {
        heading: 'What Are Representations?',
        headingRu: 'Что такое представления?',
        blocks: [
          { type: 'text', html: 'Real-world data (images, audio, text) consists of thousands or millions of low-level signals. <strong>Representation learning</strong> transforms raw data into compact, informative feature vectors suitable for downstream tasks like search, classification, or recommendation.', htmlRu: 'Реальные данные (изображения, аудио, текст) состоят из тысяч или миллионов низкоуровневых сигналов. <strong>Обучение представлений</strong> преобразует сырые данные в компактные информативные векторы признаков, подходящие для решения задач поиска, классификации или рекомендаций.' },
          { type: 'definition', title: 'Representation', titleRu: 'Представление', math: 'f_\theta: \mathcal{X} \to \mathbb{R}^d, \quad d \ll \dim(x)', note: 'A learned mapping from high-dimensional input space to a low-dimensional embedding. Activations of intermediate layers of a neural network serve as representations.', noteRu: 'Обученное отображение из высокоразмерного входного пространства в низкоразмерное вложение. Активации промежуточных слоёв нейронной сети служат представлениями.' },
          { type: 'text', html: 'In CNNs, early layers capture low-level features (edges, textures), while deeper layers respond to high-level abstractions (objects, faces). The receptive field grows with depth.', htmlRu: 'В CNN ранние слои захватывают низкоуровневые признаки (края, текстуры), а глубокие слои реагируют на высокоуровневые абстракции (объекты, лица). Рецептивное поле растёт с глубиной.' },
        ],
      },
      {
        heading: 'Supervised Pretraining & Fine-Tuning',
        headingRu: 'Обучение с учителем и файнтюнинг',
        blocks: [
          { type: 'text', html: 'The classic pipeline: (1) pretrain on a large labeled dataset (e.g., ImageNet for images, The Pile for text), (2) optionally fine-tune on a smaller task-specific dataset, (3) use the learned representations as features or weights for the downstream task.', htmlRu: 'Классический пайплайн: (1) предобучение на большом размеченном датасете (ImageNet для изображений, The Pile для текста), (2) опциональный файнтюнинг на меньшем целевом датасете, (3) использование выученных представлений как признаков или весов для целевой задачи.' },
          { type: 'text', html: 'Fine-tuning strategies include: freezing pretrained layers, gradually unfreezing, using <strong>warmup</strong> learning rate schedules, and adding new task-specific heads. Big Transfer (BiT) showed that scaling both data and model size together improves transfer quality.', htmlRu: 'Стратегии файнтюнинга: заморозка предобученных слоёв, постепенная разморозка, использование расписаний темпа обучения с <strong>warmup</strong> и добавление новых головок для конкретных задач. Big Transfer (BiT) показал, что совместное масштабирование данных и модели улучшает качество переноса.' },
        ],
      },
      {
        heading: 'Triplet Loss & Metric Learning',
        headingRu: 'Триплетные потери и обучение метрик',
        blocks: [
          { type: 'text', html: '<strong>Triplet loss</strong> (Schroff et al., 2015) trains embeddings where similar objects are close and dissimilar objects are far apart in the embedding space, using anchor-positive-negative triplets.', htmlRu: '<strong>Триплетные потери</strong> (Schroff et al., 2015) обучают вложения, где похожие объекты близки, а непохожие — далеки в пространстве вложений, используя тройки якорь-позитив-негатив.' },
          { type: 'formula', math: '\mathcal{L} = \max\bigl(0,\; \|f(x_a) - f(x_p)\|^2 - \|f(x_a) - f(x_n)\|^2 + \alpha\bigr)', label: 'Triplet loss with margin α', labelRu: 'Триплетные потери с зазором α' },
          { type: 'info', variant: 'amber', text: 'Hard negative mining is critical: random triplets are often too easy. Select negatives closest to the anchor (hardest negatives) to maximize the learning signal.', textRu: 'Поиск сложных негативов критичен: случайные тройки часто слишком просты. Выбирайте негативы, ближайшие к якорю (самые сложные), для максимизации обучающего сигнала.' },
        ],
      },
      {
        heading: 'Self-Supervised Learning',
        headingRu: 'Самообучение (Self-Supervised Learning)',
        blocks: [
          { type: 'text', html: '<strong>Self-supervised learning</strong> creates synthetic supervision signals from the data itself, eliminating the need for manual labels. Pretext tasks include: predicting masked words (BERT), solving jigsaw puzzles, colorizing grayscale images, and predicting future video frames.', htmlRu: '<strong>Самообучение</strong> создаёт синтетические сигналы надзора из самих данных, устраняя необходимость ручной разметки. Вспомогательные задачи: предсказание замаскированных слов (BERT), решение головоломок, раскрашивание чёрно-белых изображений и предсказание будущих кадров видео.' },
          { type: 'definition', title: 'Self-Supervised Paradigm', titleRu: 'Парадигма самообучения', math: '\text{pretext task: } x \to y_{\text{synthetic}}, \quad \text{where } y \text{ is derived from } x \text{ itself}', note: 'The key idea: learn representations by solving pretext tasks where the "label" comes from the data structure. These representations transfer to downstream tasks with 100× fewer labeled examples.', noteRu: 'Ключевая идея: обучать представления, решая вспомогательные задачи, где «метка» извлекается из структуры данных. Эти представления переносятся на целевые задачи со в 100× меньшим числом размеченных примеров.' },
        ],
      },
      {
        heading: 'SimCLR & Contrastive Learning',
        headingRu: 'SimCLR и контрастное обучение',
        blocks: [
          { type: 'text', html: '<strong>SimCLR</strong> (Chen et al., 2020) generates two augmented views of each image, then trains the model to recognize that these views come from the same image while pushing apart views of different images.', htmlRu: '<strong>SimCLR</strong> (Chen et al., 2020) генерирует два аугментированных вида каждого изображения, затем обучает модель распознавать, что эти виды происходят от одного изображения, одновременно отталкивая виды разных изображений.' },
          { type: 'formula', math: '\mathcal{L}_{\text{NT-Xent}} = -\log \frac{\exp(\text{sim}(z_i, z_j)/\tau)}{\sum_{k \neq i} \exp(\text{sim}(z_i, z_k)/\tau)}', label: 'NT-Xent (contrastive) loss', labelRu: 'Потери NT-Xent (контрастные)' },
          { type: 'text', html: 'Key components: (1) data augmentation pipeline (crop, flip, color distortion, blur), (2) neural network encoder f(·), (3) projection head g(·) where the loss is computed, (4) large batch sizes (2048+) for sufficient negative examples.', htmlRu: 'Ключевые компоненты: (1) пайплайн аугментации данных (обрезка, отражение, искажение цвета, размытие), (2) энкодер f(·), (3) проекционная головка g(·), где вычисляются потери, (4) большие батчи (2048+) для достаточного числа негативных примеров.' },
          { type: 'info', variant: 'emerald', text: 'SimCLR demonstrated that self-supervised pretraining can match supervised pretraining quality with 100× fewer labeled examples. Vision Transformers use BERT-style masked patch prediction for self-supervised learning on images.', textRu: 'SimCLR продемонстрировал, что самообучение может сравниться по качеству с обучением с учителем при в 100× меньшем числе размеченных примеров. Vision Transformers используют BERT-подобное предсказание замаскированных патчей для самообучения на изображениях.' },
        ],
      },
    ],
    conclusion: 'Representation learning bridges raw data and downstream tasks. Supervised pretraining, metric learning with triplet loss, and self-supervised contrastive methods (SimCLR) each offer powerful ways to learn useful features. The shift toward self-supervised methods promises to dramatically reduce the need for labeled data.',
    conclusionRu: 'Обучение представлений связывает сырые данные и целевые задачи. Предобучение с учителем, обучение метрик с триплетными потерями и самообучение контрастными методами (SimCLR) — каждый предлагает мощный способ извлечения полезных признаков. Переход к методам самообучения обещает значительно снизить потребность в размеченных данных.',
    references: [
      { title: 'A Simple Framework for Contrastive Learning of Visual Representations', authors: 'Chen et al., 2020', url: 'https://arxiv.org/abs/2002.05709' },
      { title: 'FaceNet: A Unified Embedding for Face Recognition', authors: 'Schroff et al., 2015', url: 'https://arxiv.org/abs/1503.03832' },
      { title: 'Обучение представлений (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/obuchenie-predstavlenij' },
    ],
  },

  /* ---- 39. Weight Initialization ---- */
  {
    slug: 'weight-initialization',
    title: 'Weight Initialization',
    titleRu: 'Инициализация весов',
    subtitle: 'Why Starting Point Matters in Deep Learning',
    subtitleRu: 'Почему начальная точка важна в глубоком обучении',
    authors: 'Yandex ML Handbook',
    date: 'June 2026',
    thumbnail: '/thumbnails/thumbnail-weightinit.svg',
    sections: [
      {
        heading: 'The Zero Initialization Problem',
        headingRu: 'Проблема нулевой инициализации',
        blocks: [
          { type: 'text', html: 'Initializing all weights to zero (or any constant) causes <strong>symmetry breaking failure</strong>: all neurons in a layer compute identical outputs and receive identical gradients, so they never differentiate during training.', htmlRu: 'Инициализация всех весов нулями (или любой константой) приводит к <strong>отказу нарушения симметрии</strong>: все нейроны слоя вычисляют идентичные выходы и получают идентичные градиенты, поэтому они никогда не дифференцируются при обучении.' },
          { type: 'text', html: 'For a network with at least two layers, if W₁ = 0 then all hidden activations are identical, and during backpropagation the gradient for W₁ is also zero — the network cannot learn.', htmlRu: 'Для сети с как минимум двумя слоями, если W₁ = 0, то все скрытые активации идентичны, и при обратном распространении градиент для W₁ также равен нулю — сеть не может обучаться.' },
          { type: 'info', variant: 'accent', text: '"The only property known with complete certainty is that the initial parameters need to break symmetry between different units." — Deep Learning Book, Goodfellow et al., p.301', textRu: '«Единственное свойство, известное с полной уверенностью — начальные параметры должны нарушить симметрию между различными единицами.» — Deep Learning Book, Goodfellow et al., стр.301' },
        ],
      },
      {
        heading: 'Xavier (Glorot) Initialization',
        headingRu: 'Инициализация Xavier (Glorot)',
        blocks: [
          { type: 'text', html: 'When weights come from a distribution with zero mean and variance σ², the variance of a linear layer\'s output scales as <strong>n·σ²·Var(x)</strong> where n is the number of inputs. To preserve variance across layers, we need σ² = 1/n.', htmlRu: 'Когда веса приходят из распределения с нулевым средним и дисперсией σ², дисперсия выхода линейного слоя масштабируется как <strong>n·σ²·Var(x)</strong>, где n — число входов. Чтобы сохранить дисперсию между слоями, нужно σ² = 1/n.' },
          { type: 'text', html: '<strong>Xavier initialization</strong> considers both forward and backward passes. Since the backward pass scales variance by n_next (the output dimension), the compromise is σ² = 2/(n_in + n_out).', htmlRu: '<strong>Инициализация Xavier</strong> учитывает и прямой, и обратный проход. Поскольку обратный проход масштабирует дисперсию на n_next (размерность выхода), компромисс: σ² = 2/(n_in + n_out).' },
          { type: 'formula', math: 'W \sim \mathcal{N}\!\left(0,\; \frac{2}{n_{\text{in}} + n_{\text{out}}}\right) \quad \text{or} \quad W \sim U\!\left[-\frac{\sqrt{6}}{\sqrt{n_{\text{in}} + n_{\text{out}}}},\; \frac{\sqrt{6}}{\sqrt{n_{\text{in}} + n_{\text{out}}}}\right]', label: 'Xavier initialization (Gaussian / Uniform)', labelRu: 'Инициализация Xavier (Гауссова / Равномерная)' },
          { type: 'info', variant: 'emerald', text: 'Xavier initialization is designed for tanh-like symmetric activation functions. It was shown to dramatically improve training of deep feedforward networks in the original 2010 paper by Glorot & Bengio.', textRu: 'Инициализация Xavier разработана для симметричных функций активации типа tanh. Было показано, что она значительно улучшает обучение глубоких полносвязных сетей в оригинальной статье 2010 года Glorot & Bengio.' },
        ],
      },
      {
        heading: 'Kaiming (He) Initialization',
        headingRu: 'Инициализация Kaiming (He)',
        blocks: [
          { type: 'text', html: 'ReLU activation introduces asymmetry: it zeros out half the values, so the output variance is halved compared to tanh. <strong>Kaiming initialization</strong> accounts for this by doubling the variance.', htmlRu: 'Активация ReLU вносит асимметрию: она обнуляет половину значений, поэтому дисперсия выхода вдвое меньше, чем у tanh. <strong>Инициализация Kaiming</strong> учитывает это, удваивая дисперсию.' },
          { type: 'formula', math: 'W \sim \mathcal{N}\!\left(0,\; \frac{2}{n_{\text{in}}}\right)', label: 'Kaiming initialization for ReLU', labelRu: 'Инициализация Kaiming для ReLU' },
          { type: 'text', html: 'This initialization was key to training very deep networks (like ResNets with 150+ layers) and won the ImageNet 2015 competition, surpassing human-level performance for the first time.', htmlRu: 'Эта инициализация стала ключом к обучению очень глубоких сетей (например, ResNet с 150+ слоями) и выиграла соревнование ImageNet 2015, впервые превзойдя уровень человека.' },
        ],
      },
      {
        heading: 'Practical Guidelines',
        headingRu: 'Практические рекомендации',
        blocks: [
          { type: 'text', html: 'Modern deep learning frameworks provide sensible defaults: PyTorch uses Kaiming uniform for Linear layers, while TensorFlow uses Glorot uniform. However, understanding initialization helps when training custom architectures or debugging convergence issues.', htmlRu: 'Современные фреймворки глубокого обучения предоставляют разумные значения по умолчанию: PyTorch использует Kaiming uniform для слоёв Linear, TensorFlow — Glorot uniform. Однако понимание инициализации помогает при обучении нестандартных архитектур или отладке проблем сходимости.' },
          { type: 'definition', title: 'Initialization Rule of Thumb', titleRu: 'Правило инициализации', math: '\text{Var}(W) = \begin{cases} \frac{1}{n_{\text{in}}} & \text{linear / identity} \\ \frac{2}{n_{\text{in}} + n_{\text{out}}} & \text{tanh (Xavier)} \\ \frac{2}{n_{\text{in}}} & \text{ReLU (Kaiming)} \end{cases}', note: 'Choose initialization based on your activation function. Using Xavier with ReLU or Kaiming with tanh will result in suboptimal training dynamics.', noteRu: 'Выбирайте инициализацию в зависимости от функции активации. Использование Xavier с ReLU или Kaiming с tanh приведёт к субоптимальной динамике обучения.' },
          { type: 'info', variant: 'accent', text: 'Key insight: proper initialization preserves the variance of both activations (forward pass) and gradients (backward pass), preventing vanishing or exploding signals in deep networks.', textRu: 'Ключевой инсайт: правильная инициализация сохраняет дисперсию как активаций (прямой проход), так и градиентов (обратный проход), предотвращая затухание или взрыв сигналов в глубоких сетях.' },
        ],
      },
    ],
    conclusion: 'Weight initialization is a deceptively simple yet critical component of deep learning. From zero-init failure to Xavier for tanh and Kaiming for ReLU, proper initialization ensures that signals propagate effectively through deep networks, enabling successful training from the very first step.',
    conclusionRu: 'Инициализация весов — обманчиво простой, но критический компонент глубокого обучения. От отказа нулевой инициализации до Xavier для tanh и Kaiming для ReLU — правильная инициализация обеспечивает эффективное распространение сигналов через глубокие сети, позволяя успешное обучение с самого первого шага.',
    references: [
      { title: 'Understanding the difficulty of training deep feedforward neural networks', authors: 'Glorot, Bengio, 2010', url: 'https://proceedings.mlr.press/v9/glorot10a.html' },
      { title: 'Delving Deep into Rectifiers', authors: 'He, Zhang, Ren, Sun, 2015', url: 'https://arxiv.org/abs/1502.01852' },
      { title: 'Тонкости обучения (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/tonkosti-obucheniya' },
    ],
  },

  /* ---- 40. Backpropagation ---- */
  {
    slug: 'backpropagation',
    title: 'Backpropagation',
    titleRu: 'Обратное распространение ошибки',
    subtitle: 'How Neural Networks Compute Gradients Efficiently',
    subtitleRu: 'Как нейронные сети эффективно вычисляют градиенты',
    authors: 'Yandex ML Handbook',
    date: 'June 2026',
    thumbnail: '/thumbnails/thumbnail-backprop.svg',
    sections: [
      {
        heading: 'The Chain Rule at Scale',
        headingRu: 'Цепное правило в масштабе',
        blocks: [
          { type: 'text', html: 'Backpropagation (proposed in its modern form by Rumelhart, Hinton & Williams in 1986) efficiently computes gradients of a scalar loss with respect to all parameters of a neural network using the <strong>chain rule</strong> in a single backward pass.', htmlRu: 'Обратное распространение ошибки (предложенное в современном виде Румельхартом, Хинтоном и Уильямсом в 1986 году) эффективно вычисляет градиенты скалярной функции потерь по всем параметрам нейронной сети с помощью <strong>цепного правила</strong> за один обратный проход.' },
          { type: 'formula', math: '\frac{\partial L}{\partial w_i} = \frac{\partial L}{\partial a_n} \cdot \frac{\partial a_n}{\partial a_{n-1}} \cdots \frac{\partial a_{k+1}}{\partial a_k} \cdot \frac{\partial a_k}{\partial w_i}', label: 'Chain rule for gradient computation', labelRu: 'Цепное правило для вычисления градиента' },
          { type: 'text', html: 'The key insight: gradients flow layer by layer from output to input. At each layer, the incoming gradient is transformed by the layer\'s <strong>adjoint operator</strong> (the transpose of the Jacobian), producing the gradient for the previous layer.', htmlRu: 'Ключевой инсайт: градиенты текут слой за слоем от выхода к входу. На каждом слое входящий градиент преобразуется <strong>сопряжённым оператором</strong> слоя (транспонированным якобианом), производя градиент для предыдущего слоя.' },
        ],
      },
      {
        heading: 'Forward & Backward Pass',
        headingRu: 'Прямой и обратный проход',
        blocks: [
          { type: 'text', html: '<strong>Step 1 (Forward):</strong> Compute and store all intermediate representations a₁, a₂, ..., aₙ. <strong>Step 2 (Backward):</strong> Starting from ∂L/∂aₙ, propagate gradients backward through each layer, computing ∂L/∂aₖ and ∂L/∂Wₖ.', htmlRu: '<strong>Шаг 1 (Прямой):</strong> Вычислить и сохранить все промежуточные представления a₁, a₂, ..., aₙ. <strong>Шаг 2 (Обратный):</strong> Начиная с ∂L/∂aₙ, распространять градиенты назад через каждый слой, вычисляя ∂L/∂aₖ и ∂L/∂Wₖ.' },
          { type: 'definition', title: 'Backpropagation Algorithm', titleRu: 'Алгоритм обратного распространения', math: '\nabla_{a_k} L = J_{f_k}^\top \cdot \nabla_{a_{k+1}} L', note: 'J is the Jacobian of layer f_k. The gradient transforms through the adjoint (transpose) of the layer\'s differential. This avoids computing the full Jacobian explicitly.', noteRu: 'J — якобиан слоя f_k. Градиент преобразуется через сопряжённый (транспонированный) дифференциал слоя. Это позволяет избежать явного вычисления полного якобиана.' },
        ],
      },
      {
        heading: 'Gradient Flow Through Common Layers',
        headingRu: 'Поток градиента через типичные слои',
        blocks: [
          { type: 'text', html: '<strong>Element-wise activation</strong> (ReLU, sigmoid): gradient is multiplied element-wise by σ\'(z). This is why sigmoid/tanh cause vanishing gradients — their derivatives are small.', htmlRu: '<strong>Поэлементная активация</strong> (ReLU, сигмоида): градиент поэлементно умножается на σ\'(z). Поэтому сигмоида/tanh вызывают затухание градиентов — их производные малы.' },
          { type: 'formula', math: '\nabla_{z} L = \sigma\'(z) \odot \nabla_{a} L', label: 'Gradient through activation function', labelRu: 'Градиент через функцию активации' },
          { type: 'text', html: '<strong>Linear layer</strong> y = Wx: the gradient for weights is ∂L/∂W = (∂L/∂y)·xᵀ, and the gradient for inputs is ∂L/∂x = Wᵀ·(∂L/∂y).', htmlRu: '<strong>Линейный слой</strong> y = Wx: градиент для весов ∂L/∂W = (∂L/∂y)·xᵀ, градиент для входов ∂L/∂x = Wᵀ·(∂L/∂y).' },
          { type: 'text', html: '<strong>Softmax + Cross-Entropy</strong>: the combined gradient simplifies elegantly to (predicted_probabilities − true_labels), avoiding numerical instability of computing each separately.', htmlRu: '<strong>Softmax + кросс-энтропия</strong>: комбинированный градиент элегантно упрощается до (предсказанные_вероятности − истинные_метки), избегая численной нестабильности раздельного вычисления.' },
        ],
      },
      {
        heading: 'Autograd & Modern Frameworks',
        headingRu: 'Autograd и современные фреймворки',
        blocks: [
          { type: 'text', html: 'Modern frameworks (PyTorch, TensorFlow, JAX) implement <strong>automatic differentiation</strong> (autograd). Each layer only needs to implement its own forward and backward pass — the framework chains them automatically through a computational graph.', htmlRu: 'Современные фреймворки (PyTorch, TensorFlow, JAX) реализуют <strong>автоматическое дифференцирование</strong> (autograd). Каждый слой реализует только свой прямой и обратный проход — фреймворк автоматически связывает их через вычислительный граф.' },
          { type: 'text', html: 'This modular design means you can think about the forward pass (how data transforms) and let the library handle differentiation. The computational graph is built dynamically (PyTorch) or statically (TensorFlow/XLA) during the forward pass.', htmlRu: 'Эта модульная архитектура позволяет думать о прямом проходе (как данные преобразуются) и предоставить библиотеке обработку дифференцирования. Вычислительный граф строится динамически (PyTorch) или статически (TensorFlow/XLA) во время прямого прохода.' },
          { type: 'info', variant: 'emerald', text: 'Backpropagation makes neural networks practical: each layer is a self-contained module that knows how to compute forward pass and backward gradients. Layers are assembled like building blocks, and autograd chains everything together.', textRu: 'Обратное распространение делает нейронные сети практичными: каждый слой — самодостаточный модуль, знающий прямой проход и обратные градиенты. Слои собираются как строительные блоки, а autograd связывает всё вместе.' },
        ],
      },
      {
        heading: 'Memory, Checkpointing & Alternatives',
        headingRu: 'Память, чекпоинтинг и альтернативы',
        blocks: [
          { type: 'text', html: '<strong>Gradient checkpointing</strong> trades compute for memory: instead of storing all intermediate activations, it recomputes them during the backward pass. This reduces memory from O(n) to O(√n), enabling training of very deep models or larger batch sizes.', htmlRu: '<strong>Градиентный чекпоинтинг</strong> обменивает вычисления на память: вместо хранения всех промежуточных активаций он перевычисляет их во время обратного прохода. Это снижает память с O(n) до O(√n), позволяя обучать очень глубокие модели или использовать большие батчи.' },
          { type: 'text', html: '<strong>Forward-mode AD</strong> (used in JAX\'s jvp) computes Jacobian-vector products efficiently when the number of inputs is small. <strong>Vector-Jacobian products (VJPs)</strong> are what backprop computes — efficient when the number of outputs is small (which is the case for scalar loss).', htmlRu: '<strong>Прямой режим AD</strong> (используемый в JAX jvp) эффективно вычисляет произведения якобиан-вектор при малом числе входов. <strong>Вектор-якобиановы произведения (VJP)</strong> — то, что вычисляет обратное распространение — эффективно при малом числе выходов (что верно для скалярной потери).' },
          { type: 'info', variant: 'amber', text: 'Beyond backprop: <strong>evolutionary strategies</strong> and <strong>direct feedback alignment</strong> (DFA) offer alternatives that avoid the lockstep nature of backpropagation, potentially enabling more parallel training. However, backprop remains dominant for its efficiency and exactness.', textRu: 'За рамками обратного распространения: <strong>эволюционные стратегии</strong> и <strong>прямое выравнивание обратной связи</strong> (DFA) предлагают альтернативы, избегающие синхронной природы обратного распространения, потенциально позволяя более параллельное обучение. Однако обратное распространение остаётся доминирующим благодаря эффективности и точности.' },
        ],
      },
    ],
    conclusion: 'Backpropagation is the algorithm that makes deep learning possible. By applying the chain rule layer by layer, it computes exact gradients in O(n) time. Gradient checkpointing enables training at scale, and autograd in modern frameworks makes it seamless for practitioners.',
    conclusionRu: 'Обратное распространение ошибки — алгоритм, делающий глубокое обучение возможным. Применяя цепное правило слой за слоем, он вычисляет точные градиенты за O(n) времени, где n — число слоёв. В сочетании с autograd в современных фреймворках он позволяет быстро экспериментировать со сложными архитектурами.',
    references: [
      { title: 'Learning representations by back-propagating errors', authors: 'Rumelhart, Hinton, Williams, 1986', url: 'https://www.nature.com/articles/323533a0' },
      { title: 'Метод обратного распространения ошибки (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/metod-obratnogo-rasprostraneniya-oshibki' },
    ],
  },

]

/** Lookup helper */
export function getChapter(slug: string): ArticleChapter | undefined {
  return chapters.find((c) => c.slug === slug)
}
